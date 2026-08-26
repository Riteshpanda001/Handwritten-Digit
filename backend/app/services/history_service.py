"""
History service handling query retrieval and deletion of logged predictions.
"""
from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from app.database.repositories import PredictionRepository


class HistoryService:
    """Service interfacing between API layer and PredictionRepository."""

    @staticmethod
    def get_history(
        db: Session,
        skip: int = 0,
        limit: int = 50,
        digit_filter: Optional[int] = None,
        user_id: Optional[int] = None
    ) -> Dict[str, Any]:
        records = PredictionRepository.get_history(db, skip=skip, limit=limit, digit_filter=digit_filter, user_id=user_id)
        total_count = PredictionRepository.count_records(db, user_id=user_id)
        return {
            "total_count": total_count,
            "records": records
        }

    @staticmethod
    def clear_history(db: Session, user_id: Optional[int] = None) -> Dict[str, Any]:
        deleted_count = PredictionRepository.delete_all_history(db, user_id=user_id)
        return {
            "status": "success",
            "deleted_count": deleted_count
        }
