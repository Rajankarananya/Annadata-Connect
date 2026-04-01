from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.utils.db import get_db
from app.schemas.farmer import FarmerCreate, FarmerUpdate, FarmerResponse
from app.services import farmer_svc

router = APIRouter()

@router.post("/", response_model=FarmerResponse)
async def register_farmer(farmer: FarmerCreate, db: AsyncSession = Depends(get_db)):
    return await farmer_svc.create_farmer(db, farmer)

@router.get("/{farmer_id}", response_model=FarmerResponse)
async def get_farmer(farmer_id: int, db: AsyncSession = Depends(get_db)):
    farmer = await farmer_svc.get_farmer(db, farmer_id)
    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer not found")
    return farmer

@router.put("/{farmer_id}", response_model=FarmerResponse)
async def update_farmer(farmer_id: int, data: FarmerUpdate, db: AsyncSession = Depends(get_db)):
    farmer = await farmer_svc.update_farmer(db, farmer_id, data)
    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer not found")
    return farmer