"""
Dependency injection bindings for FastAPI endpoints.
"""
from app.config import settings
from app.services.prediction_service import PredictionService
from app.services.model_service import ModelService
from app.services.history_service import HistoryService


def get_prediction_service() -> PredictionService:
    return PredictionService(model_path=settings.MODEL_PATH)


def get_model_service() -> ModelService:
    return ModelService(model_path=settings.MODEL_PATH)


def get_history_service() -> HistoryService:
    return HistoryService()
