"""
Prediction service handling machine learning inference and database logging.
"""
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from typing import Dict, Any, Optional
from app.ml.predictor import DigitPredictor
from app.services.preprocessing_service import PreprocessingService
from app.database.repositories import PredictionRepository


class PredictionService:
    """Orchestrates preprocessing, model inference, and record persistence."""

    def __init__(self, model_path: str):
        self.predictor = DigitPredictor(model_path)

    def predict_canvas(self, image_data: str, db: Session) -> Dict[str, Any]:
        """Processes base64 canvas data, runs prediction, and logs to history database."""
        tensor_input = PreprocessingService.process_canvas(image_data)
        prediction_result = self.predictor.predict(tensor_input)

        # Log prediction to database history
        record = PredictionRepository.create_record(
            db=db,
            input_type="canvas",
            predicted_digit=prediction_result["predicted_digit"],
            confidence=prediction_result["confidence"],
            confidence_scores=prediction_result["confidence_scores"]
        )

        prediction_result["record_id"] = record.id
        prediction_result["created_at"] = record.created_at or datetime.now(timezone.utc)

        return prediction_result

    def predict_image_bytes(self, image_bytes: bytes, filename: str, db: Session) -> Dict[str, Any]:
        """Processes uploaded image bytes, runs prediction, and logs to database."""
        tensor_input = PreprocessingService.process_image(image_bytes)
        prediction_result = self.predictor.predict(tensor_input)

        record = PredictionRepository.create_record(
            db=db,
            input_type="image_upload",
            predicted_digit=prediction_result["predicted_digit"],
            confidence=prediction_result["confidence"],
            confidence_scores=prediction_result["confidence_scores"],
            image_filename=filename
        )

        prediction_result["record_id"] = record.id
        prediction_result["created_at"] = record.created_at or datetime.now(timezone.utc)

        return prediction_result
