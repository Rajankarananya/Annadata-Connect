from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class LandRecordCreate(BaseModel):
    farmer_id: int
    survey_no: Optional[str] = None
    area_acres: Optional[float] = None
    crop_type: Optional[str] = None
    latitude: Optional[float] = None   # we convert to PostGIS Point in service
    longitude: Optional[float] = None

class LandRecordResponse(BaseModel):
    id: int
    farmer_id: int
    survey_no: Optional[str] = None
    area_acres: Optional[float] = None
    crop_type: Optional[str] = None
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}