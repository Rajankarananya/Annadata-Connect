from sqlalchemy import Column, Integer, Float, String, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship
from geoalchemy2 import Geometry
from app.utils.db import Base

class LandRecord(Base):
    __tablename__ = "land_records"

    id          = Column(Integer, primary_key=True, index=True)
    farmer_id   = Column(Integer, ForeignKey("farmers.id"), nullable=False)
    survey_no   = Column(String(50))
    area_acres  = Column(Float)
    crop_type   = Column(String(100))
    location    = Column(Geometry(geometry_type="POINT", srid=4326))
    created_at  = Column(DateTime(timezone=True), server_default=func.now())

    farmer      = relationship("Farmer", back_populates="land_records")