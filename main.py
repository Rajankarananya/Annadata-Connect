"""
Minimal FastAPI app for local testing.
Dev B will replace this with their full main.py
"""

import os
from fastapi import FastAPI
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
cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
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
