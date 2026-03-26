from fastapi import FastAPI
from app.routes import farmers, claims, grievances

app = FastAPI(title="Agri Claims API", version="0.1.0")

API_PREFIX = "/api/v1"
app.include_router(farmers.router, prefix=f"{API_PREFIX}/farmers", tags=["farmers"])
app.include_router(claims.router, prefix=f"{API_PREFIX}/claims", tags=["claims"])
app.include_router(grievances.router, prefix=f"{API_PREFIX}/grievances", tags=["grievances"])

@app.get(f"{API_PREFIX}/health")
async def health():
    return {"status": "ok"}