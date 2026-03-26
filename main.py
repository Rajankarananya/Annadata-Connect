"""
Minimal FastAPI app for local testing.
Dev B will replace this with their full main.py
"""

from fastapi import FastAPI

# Import route modules
from routes.chat import router as chat_router
from routes.weather import router as weather_router

app = FastAPI(
    title="Annadata Connect API",
    description="Agricultural admin web app for Indian farmers",
    version="0.1.0"
)

# Register routers with /api/v1 prefix
app.include_router(chat_router, prefix="/api/v1")
app.include_router(weather_router, prefix="/api/v1")


@app.get("/")
def health_check():
    return {"status": "ok", "message": "Annadata Connect API is running"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
