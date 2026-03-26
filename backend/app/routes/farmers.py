from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.utils.db import get_db
from app.schemas.farmer import FarmerCreate, FarmerUpdate, FarmerResponse

router = APIRouter()

@router.post("/", response_model=FarmerResponse)
async def register_farmer(farmer: FarmerCreate, db: AsyncSession = Depends(get_db)):
    return {"id": 1, **farmer.model_dump(), "created_at": None}

@router.get("/{farmer_id}", response_model=FarmerResponse)
async def get_farmer(farmer_id: int, db: AsyncSession = Depends(get_db)):
    return {"id": farmer_id, "full_name": "stub", "phone": "0000000000", "created_at": None}

@router.put("/{farmer_id}", response_model=FarmerResponse)
async def update_farmer(farmer_id: int, farmer: FarmerUpdate, db: AsyncSession = Depends(get_db)):
    return {"id": farmer_id, "full_name": "stub", "phone": "0000000000", "created_at": None}