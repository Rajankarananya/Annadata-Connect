from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import tensorflow as tf
from PIL import Image
import io, shutil, os, tempfile

from ..utils.exif_extractor import extract_exif
from ..utils.fraud_checker import check_fraud

app = FastAPI(title="Crop Damage Analysis API")

app.add_middleware(CORSMiddleware, allow_origins=["*"],
                   allow_methods=["*"], allow_headers=["*"])

# Load model once on startup
import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "models", "efficientnet_crop.h5")
model = tf.keras.models.load_model(MODEL_PATH)
CLASS_NAMES = ["bacterial_spot", "late_blight", "healthy"]  # match your training order

def preprocess_image(image_bytes: bytes) -> np.ndarray:
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((224, 224))
    arr = np.array(img) / 255.0
    return np.expand_dims(arr, axis=0)

@app.post("/analyze")
async def analyze_crop(
    file: UploadFile = File(...),
    land_lat: float  = Form(None),
    land_lon: float  = Form(None),
    claim_date: str  = Form(None)
):
    image_bytes = await file.read()

    # Save temp file for EXIF extraction
    with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as tmp:
        tmp.write(image_bytes)
        tmp_path = tmp.name

    # 1. Model prediction
    arr  = preprocess_image(image_bytes)
    preds = model.predict(arr)[0]
    class_idx   = int(np.argmax(preds))
    confidence  = float(np.max(preds))
    damage_label = CLASS_NAMES[class_idx]

    # 2. EXIF extraction
    exif = extract_exif(tmp_path)
    os.unlink(tmp_path)

    # 3. Fraud check
    fraud = check_fraud(
        exif_lat=exif.get("gps_lat"),
        exif_lon=exif.get("gps_lon"),
        land_lat=land_lat,
        land_lon=land_lon,
        exif_timestamp=exif.get("timestamp"),
        claim_date=claim_date
    )

    return {
        "damage_class":  damage_label,
        "confidence":    round(confidence * 100, 1),
        "damage_level":  "High" if damage_label != "healthy" else "None",
        "exif":          exif,
        "fraud_check":   fraud
    }

@app.get("/health")
def health():
    return {"status": "ok", "model": MODEL_PATH}