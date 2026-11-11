"""
Health check endpoints for API monitoring.
"""
from fastapi import APIRouter
from app.ml.model_loader import ModelLoader

router = APIRouter(prefix="/health", tags=["Health"])


@router.get("", summary="Health Check")
def health_check():
    """Returns application health status and ML model load state."""
    return {
        "status": "healthy",
        "model_loaded": ModelLoader.is_loaded(),
        "device": str(ModelLoader.get_device())
    }
