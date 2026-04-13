import os

from fastapi import APIRouter, Query
import httpx

router = APIRouter()

OPEN_METEO_BASE_URL = os.getenv("OPEN_METEO_BASE_URL", "https://api.open-meteo.com/v1/forecast")
WEATHER_DEFAULT_TIMEZONE = os.getenv("WEATHER_DEFAULT_TIMEZONE", "auto")
WEATHER_HOURLY_FIELDS = os.getenv(
    "WEATHER_HOURLY_FIELDS",
    (
        "temperature_2m,soil_temperature_0cm,rain,surface_pressure,cloud_cover,visibility,"
        "evapotranspiration,temperature_80m,wind_speed_10m,wind_gusts_10m,wind_direction_10m,"
        "wind_direction_80m,precipitation,precipitation_probability,relative_humidity_2m"
    ),
)


@router.get("/risk")
async def weather_risk(lat: float = Query(...), lon: float = Query(...)):
    """
    Get weather risk assessment for a location.

    Args:
        lat: Latitude coordinate
        lon: Longitude coordinate

    Returns:
        JSON with flood risk, drought risk, rainfall, and other weather data
    """
    try:
        # Call Open-Meteo forecast API with hourly metrics.
        async with httpx.AsyncClient() as client:
            response = await client.get(
                OPEN_METEO_BASE_URL,
                params={
                    "latitude": lat,
                    "longitude": lon,
                    "hourly": WEATHER_HOURLY_FIELDS,
                    "timezone": WEATHER_DEFAULT_TIMEZONE,
                },
                timeout=10,
            )
            response.raise_for_status()
            data = response.json()

        hourly = data.get("hourly", {})
        rain_series = [v for v in hourly.get("rain", []) if v is not None]
        precipitation_series = [v for v in hourly.get("precipitation", []) if v is not None]
        temp_series = [v for v in hourly.get("temperature_2m", []) if v is not None]
        humidity_series = [v for v in hourly.get("relative_humidity_2m", []) if v is not None]

        rainfall = rain_series[-1] if rain_series else (precipitation_series[-1] if precipitation_series else 0)
        temp = temp_series[-1] if temp_series else 0
        humidity = humidity_series[-1] if humidity_series else 50

        # Calculate risk scores
        flood_risk = min(100, int(rainfall * 5 + humidity * 0.2))
        drought_risk = max(0, int((100 - rainfall) * 0.5))

        return {
            "risk_score": flood_risk,
            "anomaly_mm": rainfall - 2.0,
            "avg_30d_mm": 1.77,
            "lat": lat,
            "lon": lon,
            "flood_risk": flood_risk,
            "drought_risk": drought_risk,
            "rainfall": rainfall,
            "temperature": temp,
            "humidity": humidity
        }
    except Exception as e:
        return {
            "risk_score": 0,
            "anomaly_mm": -1.77,
            "avg_30d_mm": 1.77,
            "lat": lat,
            "lon": lon,
            "error": str(e)
        }
