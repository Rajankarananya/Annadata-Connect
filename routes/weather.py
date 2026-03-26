"""
Weather Risk Route - Agricultural weather risk assessment
Fetches rainfall data from Open-Meteo API and calculates flood/drought risk scores.
Helps farmers make informed decisions about crop management.
"""

from fastapi import APIRouter, Query, HTTPException
import httpx

# Initialize the router
router = APIRouter(tags=["Weather"])

# ---------------------------------------------------------------------------
# Open-Meteo API Configuration
# Free, open-source weather API - no API key required
# ---------------------------------------------------------------------------
OPEN_METEO_BASE_URL = "https://api.open-meteo.com/v1/forecast"


@router.get("/weather/risk")
async def get_weather_risk(
    lat: float = Query(..., description="Latitude of the location"),
    lon: float = Query(..., description="Longitude of the location")
):
    """
    Calculate weather risk score based on rainfall anomaly.

    Fetches 30 days of historical rainfall + 7 days forecast,
    then calculates how much the recent rainfall deviates from average.
    High positive anomaly = potential flood risk

    Args:
        lat: Latitude of the farm/location (e.g., 19.0760 for Mumbai)
        lon: Longitude of the farm/location (e.g., 72.8777 for Mumbai)

    Returns:
        JSON with risk_score, anomaly_mm, avg_30d_mm, lat, lon
    """

    # ---------------------------------------------------------------------------
    # Step 1: Build the API request parameters
    # ---------------------------------------------------------------------------
    params = {
        "latitude": lat,
        "longitude": lon,
        "daily": "precipitation_sum",  # Daily rainfall in mm
        "past_days": 30,               # Get last 30 days of data
        "forecast_days": 7,            # Get next 7 days forecast
        "timezone": "Asia/Kolkata"     # Indian Standard Time
    }

    try:
        # ---------------------------------------------------------------------------
        # Step 2: Fetch data from Open-Meteo API
        # Using async client for non-blocking HTTP requests
        # ---------------------------------------------------------------------------
        async with httpx.AsyncClient() as client:
            response = await client.get(OPEN_METEO_BASE_URL, params=params)
            response.raise_for_status()  # Raise exception for HTTP errors
            data = response.json()

        # ---------------------------------------------------------------------------
        # Step 3: Extract precipitation data
        # The API returns daily precipitation_sum as an array
        # ---------------------------------------------------------------------------
        daily_data = data.get("daily", {})
        precipitation_list = daily_data.get("precipitation_sum", [])

        if not precipitation_list:
            raise HTTPException(
                status_code=500,
                detail="No precipitation data returned from weather API"
            )

        # ---------------------------------------------------------------------------
        # Step 4: Filter out None values
        # API may return None for days with missing data
        # ---------------------------------------------------------------------------
        valid_precipitation = [p for p in precipitation_list if p is not None]

        if len(valid_precipitation) < 7:
            raise HTTPException(
                status_code=500,
                detail="Insufficient precipitation data for risk calculation"
            )

        # ---------------------------------------------------------------------------
        # Step 5: Calculate 30-day average rainfall
        # This represents the "normal" rainfall for the area
        # ---------------------------------------------------------------------------
        # Historical data is the first 30 values (past_days)
        historical_data = valid_precipitation[:30] if len(valid_precipitation) >= 30 else valid_precipitation[:-7]

        if not historical_data:
            raise HTTPException(
                status_code=500,
                detail="Insufficient historical data for average calculation"
            )

        avg_30d = sum(historical_data) / len(historical_data)

        # ---------------------------------------------------------------------------
        # Step 6: Calculate anomaly
        # Anomaly = max rainfall in last 7 days - average rainfall
        # Positive anomaly indicates higher than normal rainfall (flood risk)
        # Negative anomaly indicates lower than normal (drought concern)
        # ---------------------------------------------------------------------------
        # Last 7 values are the forecast
        last_7_days = valid_precipitation[-7:]
        max_recent = max(last_7_days)
        anomaly = max_recent - avg_30d

        # ---------------------------------------------------------------------------
        # Step 7: Calculate risk score
        # Formula: risk_score = min(100, int((anomaly / (avg + 1)) * 50))
        #
        # Explanation:
        # - (avg + 1) prevents division by zero in dry areas
        # - Multiplying by 50 scales the ratio to a percentage-like score
        # - Capped at 100 to keep score in 0-100 range
        # - Higher score = higher flood/excess rainfall risk
        # ---------------------------------------------------------------------------
        risk_score = min(100, int((anomaly / (avg_30d + 1)) * 50))

        # Ensure risk score is not negative (min 0)
        risk_score = max(0, risk_score)

        # ---------------------------------------------------------------------------
        # Step 8: Return the calculated risk assessment
        # ---------------------------------------------------------------------------
        return {
            "risk_score": risk_score,
            "anomaly_mm": round(anomaly, 2),
            "avg_30d_mm": round(avg_30d, 2),
            "lat": lat,
            "lon": lon
        }

    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=502,
            detail=f"Weather API error: {e.response.status_code}"
        )
    except httpx.RequestError as e:
        raise HTTPException(
            status_code=503,
            detail=f"Failed to connect to weather API: {str(e)}"
        )
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(
            status_code=500,
            detail=f"Error calculating weather risk: {str(e)}"
        )
