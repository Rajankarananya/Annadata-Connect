from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException
from app.models.grievance import Grievance
from app.schemas.grievance import GrievanceCreate

async def create_grievance(db: AsyncSession, data: GrievanceCreate) -> Grievance:
    grievance = Grievance(**data.model_dump())
    if not grievance.category:
        grievance.category = "normal"
    db.add(grievance)
    try:
        await db.commit()
        await db.refresh(grievance)
        return grievance
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Invalid farmer or claim ID")

async def get_grievance(db: AsyncSession, grievance_id: int) -> Grievance | None:
    result = await db.execute(select(Grievance).where(Grievance.id == grievance_id))
    return result.scalar_one_or_none()