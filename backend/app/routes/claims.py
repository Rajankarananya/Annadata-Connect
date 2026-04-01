from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.utils.db import get_db
from app.schemas.claim import ClaimCreate, ClaimStatusUpdate, ClaimResponse
from app.services import claim_svc
from app.utils.auth import get_current_user, require_role

router = APIRouter()

@router.post("/", response_model=ClaimResponse)
async def submit_claim(
    claim: ClaimCreate,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(require_role("farmer"))
):
    return await claim_svc.create_claim(db, claim)

@router.get("/{claim_id}", response_model=ClaimResponse)
async def get_claim(
    claim_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    claim = await claim_svc.get_claim(db, claim_id)
    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")
    return claim

@router.patch("/{claim_id}/status", response_model=ClaimResponse)
async def update_claim_status(
    claim_id: int,
    data: ClaimStatusUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(require_role("field_officer", "admin"))
):
    claim = await claim_svc.update_claim_status(db, claim_id, data)
    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")
    return claim