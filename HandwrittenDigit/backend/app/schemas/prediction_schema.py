"""
Pydantic schemas for prediction requests and responses including multi-algorithm comparisons.
"""
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Dict, Optional, Any
from datetime import datetime


class CanvasPredictionRequest(BaseModel):
    image_data: str = Field(..., description="Base64 encoded image string (e.g. data:image/png;base64,...)")


class DigitConfidenceItem(BaseModel):
    digit: int = Field(..., ge=0, le=9)
    name: str
    confidence: float = Field(..., ge=0.0, le=1.0)


class PredictionResponse(BaseModel):
    predicted_digit: int = Field(..., ge=0, le=9)
    digit_name: str
    confidence: float = Field(..., ge=0.0, le=1.0)
    confidence_scores: Dict[int, float]
    probabilities: List[DigitConfidenceItem]
    algorithm_predictions: Optional[Dict[str, Any]] = None
    handwriting_quality: Optional[Dict[str, Any]] = None
    image_similarity: Optional[Dict[str, Any]] = None
    record_id: Optional[int] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
