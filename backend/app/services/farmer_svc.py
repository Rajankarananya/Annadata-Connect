from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException
from app.models.farmer import Farmer
from app.schemas.farmer import FarmerCreate, FarmerUpdate

async def create_farmer(db: AsyncSession, data: FarmerCreate) -> Farmer:
    farmer = Farmer(**data.model_dump())
    db.add(farmer)
    try:
        await db.commit()
        await db.refresh(farmer)
        return farmer
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Phone number already registered")

async def get_farmer(db: AsyncSession, farmer_id: int) -> Farmer | None:
    result = await db.execute(select(Farmer).where(Farmer.id == farmer_id))
    return result.scalar_one_or_none()

async def update_farmer(db: AsyncSession, farmer_id: int, data: FarmerUpdate) -> Farmer | None:
    farmer = await get_farmer(db, farmer_id)
    if not farmer:
        return None
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(farmer, field, value)
    await db.commit()
    await db.refresh(farmer)
    return farmer