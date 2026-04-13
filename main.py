"""
Minimal FastAPI app for local testing.
Dev B will replace this with their full main.py
"""

import os
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import route modules
from routes.chat import router as chat_router
from routes.weather import router as weather_router

app = FastAPI(
    title="Annadata Connect API",
    description="Agricultural admin web app for Indian farmers",
    version="0.1.0"
)

# Configure CORS
raw_cors_origins = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:5173,http://127.0.0.1:5173",
)
cors_origins = [origin.strip() for origin in raw_cors_origins.split(",") if origin.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers with /api/v1 prefix
app.include_router(chat_router, prefix="/api/v1")
app.include_router(weather_router, prefix="/api/v1")


@app.options("/api/v1/{full_path:path}")
async def cors_preflight(full_path: str, request: Request):
    """Fallback OPTIONS handler for reverse-proxy and local preflight edge cases."""
    origin = request.headers.get("origin")
    response = Response(status_code=204)

    if origin and origin in cors_origins:
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Vary"] = "Origin"
        response.headers["Access-Control-Allow-Credentials"] = "true"
        response.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,PATCH,DELETE,OPTIONS"
        request_headers = request.headers.get("access-control-request-headers", "Authorization,Content-Type")
        response.headers["Access-Control-Allow-Headers"] = request_headers

    return response


@app.get("/")
def health_check():
    return {"status": "ok", "message": "Annadata Connect API is running"}


if __name__ == "__main__":
    import uvicorn
    import os
    from dotenv import load_dotenv

    load_dotenv()
    port = int(os.getenv("BACKEND_PORT", 8000))
    host = os.getenv("BACKEND_HOST", "0.0.0.0")

    uvicorn.run(app, host=host, port=port)
