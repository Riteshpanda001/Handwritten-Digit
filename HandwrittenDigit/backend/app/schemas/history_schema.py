"""
Pydantic schemas for prediction history endpoints.
"""
from pydantic import BaseModel, ConfigDict
from typing import List, Dict, Optional
from datetime import datetime


class HistoryRecordResponse(BaseModel):
    id: int
    input_type: str
    predicted_digit: int
    confidence: float
    confidence_scores: Dict[int, float]
    image_filename: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class HistoryListResponse(BaseModel):
    total_count: int
    records: List[HistoryRecordResponse]


class ClearHistoryResponse(BaseModel):
    status: str
    deleted_count: int
