"""
SQLAlchemy ORM Data Models for Prediction History and Authentication.
"""
from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Float, DateTime, JSON, ForeignKey
from sqlalchemy.orm import relationship
from app.database.connection import Base


class User(Base):
    """Stores user accounts for authentication."""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    predictions = relationship("PredictionRecord", back_populates="user", cascade="all, delete-orphan")


class PredictionRecord(Base):
    """Stores history of digit prediction requests and inference results."""
    __tablename__ = "prediction_history"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True, index=True)
    input_type = Column(String, nullable=False, default="canvas")  # canvas or upload
    predicted_digit = Column(Integer, nullable=False, index=True)
    confidence = Column(Float, nullable=False)
    confidence_scores = Column(JSON, nullable=False)  # Dict[int, float]
    image_filename = Column(String, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="predictions")
