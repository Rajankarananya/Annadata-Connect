from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.utils.db import get_db

router = APIRouter()

@router.post("/")
async def submit_grievance(db: AsyncSession = Depends(get_db)):
    return {"msg": "submit grievance — stub"}

@router.get("/{grievance_id}")
async def get_grievance(grievance_id: int, db: AsyncSession = Depends(get_db)):
    return {"grievance_id": grievance_id}