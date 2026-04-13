from math import radians, sin, cos, sqrt, atan2

def haversine_distance_km(lat1, lon1, lat2, lon2) -> float:
    """Calculate distance in km between two GPS coordinates."""
    R = 6371  # Earth radius in km
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    return R * 2 * atan2(sqrt(a), sqrt(1 - a))

def check_fraud(exif_lat, exif_lon, land_lat, land_lon,
                exif_timestamp=None, claim_date=None) -> dict:
    """
    Returns fraud assessment based on GPS offset and timestamp.
    
    Flags:
    - GPS mismatch: image taken >5km from registered land
    - Timestamp mismatch: image older than claim date
    """
    result = {
        "is_flagged": False,
        "reasons": [],
        "distance_km": None
    }

    # GPS check
    if all(v is not None for v in [exif_lat, exif_lon, land_lat, land_lon]):
        dist = haversine_distance_km(exif_lat, exif_lon, land_lat, land_lon)
        result["distance_km"] = round(dist, 2)
        if dist > 5:
            result["is_flagged"] = True
            result["reasons"].append(
                f"GPS offset {dist:.1f}km — image not taken at registered land"
            )
    else:
        result["reasons"].append("Missing GPS data in image — cannot verify location")

    # Timestamp check
    if exif_timestamp and claim_date:
        from datetime import datetime
        exif_dt   = datetime.fromisoformat(exif_timestamp)
        claim_dt  = datetime.fromisoformat(claim_date)
        if exif_dt < claim_dt.replace(year=claim_dt.year - 1):
            result["is_flagged"] = True
            result["reasons"].append("Image timestamp predates claim by over 1 year")

    return result