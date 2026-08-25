"""
Prediction endpoints for base64 canvas drawings and file image uploads.
"""
from typing import Optional
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.database.models import User
from app.schemas.prediction_schema import CanvasPredictionRequest, PredictionResponse
from app.services.prediction_service import PredictionService
from app.dependencies import get_prediction_service, get_optional_current_user
from app.utils.image_utils import save_upload_bytes, validate_content_type
from app.config import settings

router = APIRouter(prefix="/predict", tags=["Prediction"])


@router.post("/canvas", response_model=PredictionResponse, summary="Predict Digit from Canvas Base64 Data")
def predict_canvas(
    request: CanvasPredictionRequest,
    db: Session = Depends(get_db),
    prediction_service: PredictionService = Depends(get_prediction_service),
    current_user: Optional[User] = Depends(get_optional_current_user)
):
    """
    Accepts base64 encoded image string drawn on canvas, performs image normalization
    and auto-centering, and predicts the handwritten digit (0-9).
    """
    try:
        user_id = current_user.id if current_user else None
        return prediction_service.predict_canvas(request.image_data, db=db, user_id=user_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to process canvas prediction: {str(e)}")


@router.post("/image", response_model=PredictionResponse, summary="Predict Digit from Uploaded Image File")
async def predict_image(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    prediction_service: PredictionService = Depends(get_prediction_service),
    current_user: Optional[User] = Depends(get_optional_current_user)
):
    """
    Accepts an uploaded image file (PNG, JPG, BMP, WebP), extracts the digit contour,
    centers and normalizes it to 28x28, and predicts the digit.
    """
    if file.content_type:
        validate_content_type(file.content_type)
    
    file_bytes = await file.read()
    if not file_bytes:
        raise HTTPException(status_code=400, detail="Uploaded file is empty")

    saved_filename = save_upload_bytes(settings.UPLOAD_DIR, file_bytes, file.filename or "digit.png")

    try:
        user_id = current_user.id if current_user else None
        return prediction_service.predict_image_bytes(file_bytes, filename=saved_filename, db=db, user_id=user_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to process image file: {str(e)}")
