from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship
from app.utils.db import Base

class Claim(Base):
    __tablename__ = "claims"

    id              = Column(Integer, primary_key=True, index=True)
    farmer_id       = Column(Integer, ForeignKey("farmers.id"), nullable=False)
    damage_type     = Column(String(100))   # rice_blast, wheat_rust, healthy
    description     = Column(Text)
    image_path      = Column(String(255))
    gps_lat         = Column(String(20))
    gps_lng         = Column(String(20))
    status          = Column(String(20), default="pending")  # pending, approved, rejected
    created_at      = Column(DateTime(timezone=True), server_default=func.now())
    updated_at      = Column(DateTime(timezone=True), onupdate=func.now())

    farmer          = relationship("Farmer", back_populates="claims")
    grievances      = relationship("Grievance", back_populates="claim")