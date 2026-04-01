from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException
from app.models.claim import Claim
from app.schemas.claim import ClaimCreate, ClaimStatusUpdate

async def create_claim(db: AsyncSession, data: ClaimCreate) -> Claim:
    claim = Claim(**data.model_dump())
    db.add(claim)
    try:
        await db.commit()
        await db.refresh(claim)
        return claim
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Invalid farmer ID")

async def get_claim(db: AsyncSession, claim_id: int) -> Claim | None:
    result = await db.execute(select(Claim).where(Claim.id == claim_id))
    return result.scalar_one_or_none()

async def update_claim_status(db: AsyncSession, claim_id: int, data: ClaimStatusUpdate) -> Claim | None:
    claim = await get_claim(db, claim_id)
    if not claim:
        return None
    claim.status = data.status
    await db.commit()
    await db.refresh(claim)
    return claim