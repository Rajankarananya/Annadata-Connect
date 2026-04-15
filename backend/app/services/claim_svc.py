from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException
from app.models.claim import Claim
from app.models.audit import AuditLog
from app.schemas.claim import ClaimCreate, ClaimStatusUpdate

async def create_claim(db: AsyncSession, data: ClaimCreate) -> Claim:
    # Create dict from model data
    claim_data = data.model_dump()
    
    # Ensure farmer_id is set (should have been done by route handler)
    if not claim_data.get("farmer_id"):
        raise HTTPException(status_code=400, detail="farmer_id is required")
    
    claim = Claim(**claim_data)
    db.add(claim)
    try:
        await db.commit()
        await db.refresh(claim)
        return claim
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Invalid farmer ID or claim data")

async def get_claim(db: AsyncSession, claim_id: int) -> Claim | None:
    result = await db.execute(select(Claim).where(Claim.id == claim_id))
    return result.scalar_one_or_none()

async def list_claims(db: AsyncSession, farmer_id: int = None, status: str = None) -> list[Claim]:
    """List claims with optional filtering by farmer_id and/or status"""
    query = select(Claim)
    
    if farmer_id is not None:
        query = query.where(Claim.farmer_id == farmer_id)
    
    if status is not None:
        query = query.where(Claim.status == status)
    
    result = await db.execute(query)
    return result.scalars().all()

async def update_claim_status(
    db: AsyncSession,
    claim_id: int,
    data: ClaimStatusUpdate,
    actor_id: int,
    actor_role: str
) -> Claim | None:
    claim = await get_claim(db, claim_id)
    if not claim:
        return None
    old_status = claim.status
    claim.status = data.status

    log = AuditLog(
        claim_id=claim_id,
        actor_id=actor_id,
        actor_role=actor_role,
        action="status_changed",
        old_status=old_status,
        new_status=data.status
    )
    db.add(log)
    await db.commit()
    await db.refresh(claim)
    return claim