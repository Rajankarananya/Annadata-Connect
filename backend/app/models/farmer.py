from sqlalchemy import Column, Integer, String, Date, DateTime, func
from sqlalchemy.orm import relationship
from app.utils.db import Base

class Farmer(Base):
    __tablename__ = "farmers"

    id              = Column(Integer, primary_key=True, index=True)
    full_name       = Column(String(100), nullable=False)
    phone           = Column(String(15), unique=True, nullable=False)
    aadhaar_number  = Column(String(12), unique=True, nullable=True)
    village         = Column(String(100))
    district        = Column(String(100))
    state           = Column(String(100))
    created_at      = Column(DateTime(timezone=True), server_default=func.now())
    updated_at      = Column(DateTime(timezone=True), onupdate=func.now())

    land_records    = relationship("LandRecord", back_populates="farmer")
    claims          = relationship("Claim", back_populates="farmer")
    grievances      = relationship("Grievance", back_populates="farmer")