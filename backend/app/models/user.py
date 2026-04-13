from sqlalchemy import Column, Integer, String, DateTime, func
from app.utils.db import Base

class User(Base):
    __tablename__ = "users"

    id          = Column(Integer, primary_key=True, index=True)
    full_name   = Column(String(100))
    email       = Column(String(100), unique=True, nullable=False)
    phone       = Column(String(15), unique=True, nullable=True)
    password    = Column(String(255), nullable=False)
    role        = Column(String(20), nullable=False)  # farmer, field_officer, admin
    created_at  = Column(DateTime(timezone=True), server_default=func.now())