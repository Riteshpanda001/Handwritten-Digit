"""
Database repository for CRUD operations on prediction history logs.
"""
from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.database.models import PredictionRecord


class PredictionRepository:
    """Repository handling SQL queries for prediction logs."""

    @staticmethod
    def create_record(
        db: Session,
        input_type: str,
        predicted_digit: int,
        confidence: float,
        confidence_scores: Dict[int, float],
        image_filename: Optional[str] = None
    ) -> PredictionRecord:
        record = PredictionRecord(
            input_type=input_type,
            predicted_digit=predicted_digit,
            confidence=confidence,
            confidence_scores=confidence_scores,
            image_filename=image_filename
        )
        db.add(record)
        db.commit()
        db.refresh(record)
        return record

    @staticmethod
    def get_history(
        db: Session,
        skip: int = 0,
        limit: int = 50,
        digit_filter: Optional[int] = None
    ) -> List[PredictionRecord]:
        query = db.query(PredictionRecord)
        if digit_filter is not None:
            query = query.filter(PredictionRecord.predicted_digit == digit_filter)
        return query.order_by(desc(PredictionRecord.created_at)).offset(skip).limit(limit).all()

    @staticmethod
    def get_record_by_id(db: Session, record_id: int) -> Optional[PredictionRecord]:
        return db.query(PredictionRecord).filter(PredictionRecord.id == record_id).first()

    @staticmethod
    def count_records(db: Session) -> int:
        return db.query(PredictionRecord).count()

    @staticmethod
    def delete_all_history(db: Session) -> int:
        num_deleted = db.query(PredictionRecord).delete()
        db.commit()
        return num_deleted
