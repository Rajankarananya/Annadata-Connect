from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, func
from app.utils.db import Base

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id          = Column(Integer, primary_key=True, index=True)
    claim_id    = Column(Integer, ForeignKey("claims.id"), nullable=False)
    actor_id    = Column(Integer, nullable=False)
    actor_role  = Column(String(20), nullable=False)
    action      = Column(String(50), nullable=False)  # status_changed, claim_submitted
    old_status  = Column(String(20), nullable=True)
    new_status  = Column(String(20), nullable=True)
    created_at  = Column(DateTime(timezone=True), server_default=func.now())