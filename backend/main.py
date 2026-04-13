import os
from fastapi import FastAPI, Request, Response
from fastapi.security import HTTPBearer
from fastapi.middleware.cors import CORSMiddleware
from app.routes import chat, weather

# Only import database-dependent routes if database is available
try:
    from app.routes import farmers, claims, grievances, auth
    has_db = True
except ModuleNotFoundError:
    has_db = False

app = FastAPI(
    title="Agri Claims API",
    version="0.1.0",
)

security = HTTPBearer()

# CORS Configuration
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

API_PREFIX = "/api/v1"

# Always include chat and weather
app.include_router(chat.router, prefix=f"{API_PREFIX}/chat", tags=["chat"])
app.include_router(weather.router, prefix=f"{API_PREFIX}/weather", tags=["weather"])


@app.options(f"{API_PREFIX}/{{full_path:path}}")
async def cors_preflight(full_path: str, request: Request):
    """Fallback OPTIONS handler for local preflight edge cases."""
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

# Include database routes if available
if has_db:
    app.include_router(auth.router, prefix=f"{API_PREFIX}/auth", tags=["auth"])
    app.include_router(farmers.router, prefix=f"{API_PREFIX}/farmers", tags=["farmers"])
    app.include_router(claims.router, prefix=f"{API_PREFIX}/claims", tags=["claims"])
    app.include_router(grievances.router, prefix=f"{API_PREFIX}/grievances", tags=["grievances"])

@app.get("/health")
async def health():
    return {"status": "ok"}