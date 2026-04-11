import exifread
from datetime import datetime

def extract_exif(image_path: str) -> dict:
    """Extract GPS coordinates and timestamp from image EXIF data."""
    with open(image_path, "rb") as f:
        tags = exifread.process_file(f, stop_tag="GPS GPSLongitude")

    result = {"gps_lat": None, "gps_lon": None, "timestamp": None}

    # Parse GPS latitude
    if "GPS GPSLatitude" in tags and "GPS GPSLatitudeRef" in tags:
        lat = tags["GPS GPSLatitude"].values
        ref = str(tags["GPS GPSLatitudeRef"])
        result["gps_lat"] = _to_decimal(lat, ref)

    # Parse GPS longitude
    if "GPS GPSLongitude" in tags and "GPS GPSLongitudeRef" in tags:
        lon = tags["GPS GPSLongitude"].values
        ref = str(tags["GPS GPSLongitudeRef"])
        result["gps_lon"] = _to_decimal(lon, ref)

    # Parse timestamp
    if "EXIF DateTimeOriginal" in tags:
        raw = str(tags["EXIF DateTimeOriginal"])
        try:
            result["timestamp"] = datetime.strptime(raw, "%Y:%m:%d %H:%M:%S").isoformat()
        except ValueError:
            pass

    return result

def _to_decimal(values, ref):
    d = float(values[0].num) / float(values[0].den)
    m = float(values[1].num) / float(values[1].den)
    s = float(values[2].num) / float(values[2].den)
    decimal = d + m / 60 + s / 3600
    if ref in ["S", "W"]:
        decimal = -decimal
    return round(decimal, 6)