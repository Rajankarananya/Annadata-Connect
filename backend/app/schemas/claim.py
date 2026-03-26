from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ClaimCreate(BaseModel):
    farmer_id: int
    damage_type: Optional[str] = None   # rice_blast, wheat_rust, healthy
    description: Optional[str] = None
    image_path: Optional[str] = None
    gps_lat: Optional[str] = None
    gps_lng: Optional[str] = None

class ClaimStatusUpdate(BaseModel):
    status: str  # pending, approved, rejected

class ClaimResponse(BaseModel):
    id: int
    farmer_id: int
    damage_type: Optional[str] = None
    description: Optional[str] = None
    image_path: Optional[str] = None
    gps_lat: Optional[str] = None
    gps_lng: Optional[str] = None
    status: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    model_config = {"from_attributes": True}