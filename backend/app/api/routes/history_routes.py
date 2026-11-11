"""
Endpoints for querying and clearing prediction history.
"""
from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.database.models import User
from app.schemas.history_schema import HistoryListResponse, ClearHistoryResponse
from app.services.history_service import HistoryService
from app.dependencies import get_history_service, get_current_user

router = APIRouter(prefix="/history", tags=["Prediction History"])


@router.get("", response_model=HistoryListResponse, summary="Get Prediction History Logs")
def get_history(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    digit: Optional[int] = Query(None, ge=0, le=9),
    db: Session = Depends(get_db),
    history_service: HistoryService = Depends(get_history_service),
    current_user: User = Depends(get_current_user)
):
    """Retrieves paginated history of past predictions with optional digit filter for authenticated user."""
    return history_service.get_history(db, skip=skip, limit=limit, digit_filter=digit, user_id=current_user.id)


@router.delete("/clear", response_model=ClearHistoryResponse, summary="Clear Prediction History")
def clear_history(
    db: Session = Depends(get_db),
    history_service: HistoryService = Depends(get_history_service),
    current_user: User = Depends(get_current_user)
):
    """Deletes logged prediction history records for authenticated user."""
    return history_service.clear_history(db, user_id=current_user.id)
