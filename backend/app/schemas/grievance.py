from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class GrievanceCreate(BaseModel):
    farmer_id: int
    claim_id: Optional[int] = None
    category: Optional[str] = None  # urgent, normal
    description: Optional[str] = None

class GrievanceResponse(BaseModel):
    id: int
    farmer_id: int
    claim_id: Optional[int] = None
    category: Optional[str] = None
    description: Optional[str] = None
    status: str
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}