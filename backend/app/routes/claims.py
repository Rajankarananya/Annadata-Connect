from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.utils.db import get_db
from app.models.farmer import Farmer
from app.schemas.claim import ClaimCreate, ClaimStatusUpdate, ClaimResponse
from app.services import claim_svc
from app.utils.auth import get_current_user, require_role

router = APIRouter()

@router.get("/", response_model=list[ClaimResponse])
async def list_claims(
    status: str = Query(None),
    farmer_id: int = Query(None),
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    List claims. 
    - Farmers see only their own claims
    - Admins/field officers see all claims
    """
    try:
        user_role = current_user.get("role", "farmer")
        
        # If farmer_id is explicitly provided, use it (for admin viewing farmer's claims)
        if farmer_id is not None:
            claims_list = await claim_svc.list_claims(db, farmer_id=farmer_id, status=status)
            return claims_list
        
        # Farmers can only see their own claims
        if user_role == "farmer":
            user_id = int(current_user["sub"])
            
            # Find the farmer record for this user
            result = await db.execute(select(Farmer).where(Farmer.user_id == user_id))
            farmer = result.scalar_one_or_none()
            
            if not farmer:
                # No farmer profile, return empty list
                return []
            
            # Get claims for this farmer
            claims_list = await claim_svc.list_claims(db, farmer_id=farmer.id, status=status)
            return claims_list
        else:
            # Admin/field officers see all claims
            claims_list = await claim_svc.list_claims(db, status=status)
            return claims_list
    except Exception as e:
        print(f"[claims.list_claims] Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", response_model=ClaimResponse)
async def submit_claim(
    claim: ClaimCreate,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(require_role("farmer"))
):
    """Create a new claim. Auto-sets farmer_id from current user's farmer record."""
    try:
        user_id = int(current_user["sub"])
        
        # Find the farmer record for this user
        result = await db.execute(select(Farmer).where(Farmer.user_id == user_id))
        farmer = result.scalar_one_or_none()
        
        if not farmer:
            raise HTTPException(
                status_code=404, 
                detail="Farmer profile not found. Please complete your profile first."
            )
        
        # Convert to dict and set farmer_id
        claim_dict = claim.model_dump()
        claim_dict["farmer_id"] = farmer.id
        
        # Create new claim with the farmer_id
        updated_claim = ClaimCreate(**claim_dict)
        return await claim_svc.create_claim(db, updated_claim)
    except HTTPException:
        raise
    except Exception as e:
        print(f"[claims.submit_claim] Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

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
    claim = await claim_svc.update_claim_status(
        db, claim_id, data,
        actor_id=int(current_user["sub"]),
        actor_role=current_user["role"]
    )
    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")
    return claim