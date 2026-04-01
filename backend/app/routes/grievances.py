from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.utils.db import get_db
from app.schemas.grievance import GrievanceCreate, GrievanceResponse
from app.services import grievance_svc

router = APIRouter()

@router.post("/", response_model=GrievanceResponse)
async def submit_grievance(grievance: GrievanceCreate, db: AsyncSession = Depends(get_db)):
    return await grievance_svc.create_grievance(db, grievance)

@router.get("/{grievance_id}", response_model=GrievanceResponse)
async def get_grievance(grievance_id: int, db: AsyncSession = Depends(get_db)):
    grievance = await grievance_svc.get_grievance(db, grievance_id)
    if not grievance:
        raise HTTPException(status_code=404, detail="Grievance not found")
    return grievance