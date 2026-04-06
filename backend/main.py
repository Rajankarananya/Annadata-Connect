from fastapi import FastAPI
from fastapi.security import HTTPBearer
from app.routes import farmers, claims, grievances
from app.routes import auth

app = FastAPI(
    title="Agri Claims API",
    version="0.1.0",
)

security = HTTPBearer()

API_PREFIX = "/api/v1"
app.include_router(auth.router, prefix=f"{API_PREFIX}/auth", tags=["auth"])
app.include_router(farmers.router, prefix=f"{API_PREFIX}/farmers", tags=["farmers"])
app.include_router(claims.router, prefix=f"{API_PREFIX}/claims", tags=["claims"])
app.include_router(grievances.router, prefix=f"{API_PREFIX}/grievances", tags=["grievances"])

@app.get("/health")
async def health():
    return {"status": "ok"}