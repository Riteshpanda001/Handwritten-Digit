"""
Dependency injection bindings for FastAPI endpoints.
"""
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.database.models import User
from app.config import settings
from app.core.security import decode_access_token
from app.services.prediction_service import PredictionService
from app.services.model_service import ModelService
from app.services.history_service import HistoryService

security = HTTPBearer(auto_error=False)


def get_prediction_service() -> PredictionService:
    return PredictionService(model_path=settings.MODEL_PATH)


def get_model_service() -> ModelService:
    return ModelService(model_path=settings.MODEL_PATH)


def get_history_service() -> HistoryService:
    return HistoryService()


def get_optional_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security),
    db: Session = Depends(get_db)
) -> Optional[User]:
    if not credentials:
        return None
    payload = decode_access_token(credentials.credentials)
    if not payload or "sub" not in payload:
        return None
    user_id = payload.get("sub")
    return db.query(User).filter(User.id == user_id).first()


def get_current_user(
    user: Optional[User] = Depends(get_optional_current_user)
) -> User:
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication token is invalid or missing.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user
