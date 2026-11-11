"""
SQLAlchemy ORM Data Models for Prediction History.
"""
from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Float, DateTime, JSON
from app.database.connection import Base


class PredictionRecord(Base):
    """Stores history of digit prediction requests and inference results."""
    __tablename__ = "prediction_history"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, nullable=True, index=True)
    input_type = Column(String, nullable=False, default="canvas")  # canvas or upload
    predicted_digit = Column(Integer, nullable=False, index=True)
    confidence = Column(Float, nullable=False)
    confidence_scores = Column(JSON, nullable=False)  # Dict[int, float]
    image_filename = Column(String, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
