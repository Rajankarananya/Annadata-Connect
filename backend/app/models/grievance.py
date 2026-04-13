from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship
from app.utils.db import Base

class Grievance(Base):
    __tablename__ = "grievances"

    id          = Column(Integer, primary_key=True, index=True)
    farmer_id   = Column(Integer, ForeignKey("farmers.id"), nullable=False)
    claim_id    = Column(Integer, ForeignKey("claims.id"), nullable=True)
    category    = Column(String(50))    # urgent, normal
    description = Column(Text)
    status      = Column(String(20), default="open")  # open, resolved
    created_at  = Column(DateTime(timezone=True), server_default=func.now())

    farmer      = relationship("Farmer", back_populates="grievances")
    claim       = relationship("Claim", back_populates="grievances")