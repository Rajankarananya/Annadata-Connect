from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI(title="Agri API", version="1.0")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def health():
    return {"status": "ok", "message": "Annadata Connect API is running"}

@app.post("/api/v1/chat/multilingual")
async def chat(query: str = Query(...), lang: str = Query("en")):
    """Multilingual chat - returns mock response for testing"""
    responses = {
        "en": f"You asked: {query}. Crop insurance protects farmers from yield losses.",
        "hi": f"आपने पूछा: {query}। फसल बीमा किसानों को नुकसान से बचाता है।",
        "mr": f"आपण विचारले: {query}। शेती विमे शेतकऱ्यांचे रक्षण करते।"
    }
    return {"response": responses.get(lang, responses["en"]), "lang": lang}

@app.get("/api/v1/weather/risk")
async def weather_risk(lat: float = Query(...), lon: float = Query(...)):
    """Get weather risk - fetches from Open-Meteo API"""
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://api.open-meteo.com/v1/forecast",
                params={
                    "latitude": lat,
                    "longitude": lon,
                    "current": "rainfall,temperature,relative_humidity"
                },
                timeout=10
            )
            data = response.json().get("current", {})
            rainfall = data.get("rainfall", 0) or 0
            humidity = data.get("relative_humidity", 50) or 50

            flood_risk = int(rainfall * 5 + humidity * 0.2)
            drought_risk = max(0, int((100 - rainfall) * 0.5))

            return {
                "risk_score": flood_risk,
                "anomaly_mm": -1.77,
                "avg_30d_mm": 1.77,
                "lat": lat,
                "lon": lon,
                "flood_risk": flood_risk,
                "drought_risk": drought_risk,
                "rainfall": rainfall
            }
    except Exception as e:
        return {
            "risk_score": 0,
            "anomaly_mm": -1.77,
            "avg_30d_mm": 1.77,
            "lat": lat,
            "lon": lon,
            "error": "Weather service unavailable"
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
