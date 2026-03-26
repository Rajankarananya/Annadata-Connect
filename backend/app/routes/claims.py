from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.utils.db import get_db

router = APIRouter()

@router.post("/")
async def submit_claim(db: AsyncSession = Depends(get_db)):
    return {"msg": "submit claim — stub"}

@router.get("/{claim_id}")
async def get_claim(claim_id: int, db: AsyncSession = Depends(get_db)):
    return {"claim_id": claim_id}

@router.patch("/{claim_id}/status")
async def update_claim_status(claim_id: int, db: AsyncSession = Depends(get_db)):
    return {"claim_id": claim_id, "status": "updated"}