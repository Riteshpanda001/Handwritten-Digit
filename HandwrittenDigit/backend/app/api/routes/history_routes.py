"""
Endpoints for querying and clearing prediction history.
"""
from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.schemas.history_schema import HistoryListResponse, ClearHistoryResponse
from app.services.history_service import HistoryService
from app.dependencies import get_history_service

router = APIRouter(prefix="/history", tags=["Prediction History"])


@router.get("", response_model=HistoryListResponse, summary="Get Prediction History Logs")
def get_history(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    digit: Optional[int] = Query(None, ge=0, le=9),
    db: Session = Depends(get_db),
    history_service: HistoryService = Depends(get_history_service)
):
    """Retrieves paginated history of past predictions with optional digit filter."""
    return history_service.get_history(db, skip=skip, limit=limit, digit_filter=digit)


@router.delete("/clear", response_model=ClearHistoryResponse, summary="Clear Prediction History")
def clear_history(
    db: Session = Depends(get_db),
    history_service: HistoryService = Depends(get_history_service)
):
    """Deletes logged prediction history records."""
    return history_service.clear_history(db)
