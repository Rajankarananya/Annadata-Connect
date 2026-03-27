// Registers the service worker only for production builds.
export function registerSW() {
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => {
          console.log("SW registered");
        })
        .catch(() => {
          console.log("SW registration failed");
        });
    });
  }
}
