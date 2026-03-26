from pydantic import BaseModel, field_validator
from typing import Optional
from datetime import datetime

class FarmerCreate(BaseModel):
    full_name: str
    phone: str
    aadhaar_number: Optional[str] = None
    village: Optional[str] = None
    district: Optional[str] = None
    state: Optional[str] = None

    @field_validator("phone")
    def phone_must_be_10_digits(cls, v):
        if not v.isdigit() or len(v) != 10:
            raise ValueError("Phone must be 10 digits")
        return v

class FarmerUpdate(BaseModel):
    full_name: Optional[str] = None
    village: Optional[str] = None
    district: Optional[str] = None
    state: Optional[str] = None

class FarmerResponse(BaseModel):
    id: int
    full_name: str
    phone: str
    aadhaar_number: Optional[str] = None
    village: Optional[str] = None
    district: Optional[str] = None
    state: Optional[str] = None
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}