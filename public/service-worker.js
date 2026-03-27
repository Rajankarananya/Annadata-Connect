/*
  Annadata Connect Service Worker
  - Precaches key app shell files during install.
  - Uses Cache First for static assets.
  - Uses Network First for API calls to /api/v1/.
  - Returns offline JSON fallback for API requests when both network and cache fail.
*/

const STATIC_CACHE = "annadata-static-v1";
const API_CACHE = "annadata-api-v1";

// Update this list when core app shell file names change.
const PRECACHE_URLS = [
  "/",
  "/index.html",
  "/static/js/main.chunk.js",
  "/static/css/main.chunk.css"
];

// Install event: pre-cache essential files for offline startup.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

// Activate event: clean up old caches so stale data is removed.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== API_CACHE) {
            return caches.delete(cacheName);
          }
          return Promise.resolve();
        })
      );
    })
  );
  self.clients.claim();
});

// Cache First strategy for static assets.
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  const networkResponse = await fetch(request);
  const cache = await caches.open(STATIC_CACHE);
  cache.put(request, networkResponse.clone());
  return networkResponse;
}

// Network First strategy for API routes.
async function networkFirstApi(request) {
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(API_CACHE);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    return new Response(
      JSON.stringify({ error: "offline", message: "No internet connection" }),
      {
        status: 503,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}

// Fetch event: route requests to the appropriate caching strategy.
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Apply Network First to backend API routes.
  if (url.pathname.startsWith("/api/v1/")) {
    event.respondWith(networkFirstApi(request));
    return;
  }

  // Apply Cache First to static files typically served from /static/.
  if (
    url.pathname.startsWith("/static/") ||
    request.destination === "script" ||
    request.destination === "style" ||
    request.destination === "image" ||
    request.destination === "font"
  ) {
    event.respondWith(cacheFirst(request));
  }
});
