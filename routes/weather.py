"""
Weather Risk Route - Agricultural weather risk assessment
Fetches rainfall data from Open-Meteo API and calculates flood/drought risk scores.
Helps farmers make informed decisions about crop management.
"""

from fastapi import APIRouter, Query, HTTPException
import httpx
import asyncio
from typing import Dict, Any, List

# Initialize the router
router = APIRouter(tags=["Weather"])

# ---------------------------------------------------------------------------
# Open-Meteo API Configuration
# Free, open-source weather API - no API key required
# ---------------------------------------------------------------------------
OPEN_METEO_BASE_URL = "https://api.open-meteo.com/v1/forecast"

# District centroids used for risk-map generation.
# Dev C can join these district names against boundary GeoJSON on the frontend.
DISTRICT_COORDS = {
    "Nashik": {"state": "Maharashtra", "lat": 20.0112, "lon": 73.7909},
    "Pune": {"state": "Maharashtra", "lat": 18.5204, "lon": 73.8567},
    "Nagpur": {"state": "Maharashtra", "lat": 21.1458, "lon": 79.0882},
    "Aurangabad": {"state": "Maharashtra", "lat": 19.8762, "lon": 75.3433},
    "Kolhapur": {"state": "Maharashtra", "lat": 16.7050, "lon": 74.2433},
    "Satara": {"state": "Maharashtra", "lat": 17.6805, "lon": 74.0183},
    "Amravati": {"state": "Maharashtra", "lat": 20.9374, "lon": 77.7796},
    "Solapur": {"state": "Maharashtra", "lat": 17.6599, "lon": 75.9064},
}


def _clamp(value: float, min_value: float, max_value: float) -> float:
    return max(min_value, min(max_value, value))


def _calculate_combined_risk(precip_anomaly: float, precip_avg: float, temp_anomaly: float) -> int:
    """
    Compute a 0-100 weather risk score from rainfall and temperature anomaly.

    Weighting:
    - Rainfall anomaly contribution: 65%
    - Temperature anomaly contribution: 35%
    """
    precip_component = _clamp((abs(precip_anomaly) / (precip_avg + 1.0)) * 100.0, 0.0, 100.0)
    temp_component = _clamp((abs(temp_anomaly) / 8.0) * 100.0, 0.0, 100.0)
    risk_score = int((0.65 * precip_component) + (0.35 * temp_component))
    return int(_clamp(risk_score, 0, 100))


async def _fetch_district_weather(lat: float, lon: float) -> Dict[str, Any]:
    """
    Pull 30-day historical and 7-day forecast weather from Open-Meteo,
    then compute anomalies used by district risk-map scoring.
    """
    params = {
        "latitude": lat,
        "longitude": lon,
        "daily": "precipitation_sum,temperature_2m_mean",
        "past_days": 30,
        "forecast_days": 7,
        "timezone": "Asia/Kolkata",
    }

    async with httpx.AsyncClient(timeout=20.0) as client:
        response = await client.get(OPEN_METEO_BASE_URL, params=params)
        response.raise_for_status()
        payload = response.json()

    daily = payload.get("daily", {})
    precip = [x for x in daily.get("precipitation_sum", []) if x is not None]
    temp = [x for x in daily.get("temperature_2m_mean", []) if x is not None]

    if len(precip) < 37 or len(temp) < 37:
        raise HTTPException(
            status_code=502,
            detail="Insufficient weather data returned by Open-Meteo for risk-map calculation",
        )

    hist_precip = precip[:30]
    fc_precip = precip[-7:]
    hist_temp = temp[:30]
    fc_temp = temp[-7:]

    avg_precip_30d = sum(hist_precip) / len(hist_precip)
    avg_precip_7d = sum(fc_precip) / len(fc_precip)
    precip_anomaly = avg_precip_7d - avg_precip_30d

    avg_temp_30d = sum(hist_temp) / len(hist_temp)
    avg_temp_7d = sum(fc_temp) / len(fc_temp)
    temp_anomaly = avg_temp_7d - avg_temp_30d

    risk_score = _calculate_combined_risk(precip_anomaly, avg_precip_30d, temp_anomaly)

    return {
        "risk_score": risk_score,
        "precip_anomaly_mm": round(precip_anomaly, 2),
        "avg_precip_30d_mm": round(avg_precip_30d, 2),
        "temp_anomaly_c": round(temp_anomaly, 2),
    }


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


@router.get("/analytics/risk-map")
async def get_analytics_risk_map(
    districts: str = Query(
        default="",
        description="Optional comma-separated district names. Example: Nashik,Pune,Nagpur",
    )
):
    """
    Return district-level agricultural risk as GeoJSON FeatureCollection.

    Response shape is compatible with choropleth/geo joins on district name.
    """
    try:
        selected_names: List[str]
        if districts.strip():
            requested = [d.strip() for d in districts.split(",") if d.strip()]
            selected_names = [name for name in requested if name in DISTRICT_COORDS]
            if not selected_names:
                raise HTTPException(
                    status_code=400,
                    detail=f"No valid districts provided. Supported districts: {', '.join(sorted(DISTRICT_COORDS.keys()))}",
                )
        else:
            selected_names = sorted(DISTRICT_COORDS.keys())

        tasks = []
        for district_name in selected_names:
            district = DISTRICT_COORDS[district_name]
            tasks.append(_fetch_district_weather(district["lat"], district["lon"]))

        results = await asyncio.gather(*tasks)

        features = []
        for district_name, risk in zip(selected_names, results):
            district = DISTRICT_COORDS[district_name]
            features.append(
                {
                    "type": "Feature",
                    "id": district_name,
                    "properties": {
                        "district": district_name,
                        "state": district["state"],
                        "risk_score": risk["risk_score"],
                        "precip_anomaly_mm": risk["precip_anomaly_mm"],
                        "avg_precip_30d_mm": risk["avg_precip_30d_mm"],
                        "temp_anomaly_c": risk["temp_anomaly_c"],
                        "risk_level": (
                            "high"
                            if risk["risk_score"] >= 70
                            else "moderate"
                            if risk["risk_score"] >= 40
                            else "low"
                        ),
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [district["lon"], district["lat"]],
                    },
                }
            )

        return {
            "type": "FeatureCollection",
            "name": "district_weather_risk",
            "features": features,
            "metadata": {
                "source": "open-meteo",
                "generated_at": "realtime",
                "count": len(features),
            },
        }

    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=502,
            detail=f"Weather API error while generating risk-map: {e.response.status_code}",
        )
    except httpx.RequestError as e:
        raise HTTPException(
            status_code=503,
            detail=f"Failed to connect to weather API while generating risk-map: {str(e)}",
        )
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(
            status_code=500,
            detail=f"Error generating analytics risk-map: {str(e)}",
        )
