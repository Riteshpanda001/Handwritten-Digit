"""
Endpoints for querying model information and triggering model reload.
"""
from fastapi import APIRouter, Depends
from app.schemas.model_schema import ModelInfoResponse, ModelReloadResponse
from app.services.model_service import ModelService
from app.dependencies import get_model_service

router = APIRouter(prefix="/model", tags=["Model Information"])


@router.get("/info", response_model=ModelInfoResponse, summary="Get Model Architecture Metadata")
def get_model_info(model_service: ModelService = Depends(get_model_service)):
    """Returns details about loaded classifier model, input shapes, device, and class labels."""
    return model_service.get_info()


@router.post("/reload", response_model=ModelReloadResponse, summary="Reload Model Weights from Disk")
def reload_model(model_service: ModelService = Depends(get_model_service)):
    """Triggers forced reload of model weights file from disk into memory."""
    return model_service.reload()
