"""
Custom exceptions and error response formatters.
"""
from fastapi import HTTPException, status


class ModelNotFoundException(HTTPException):
    def __init__(self, detail: str = "Trained model weights file not found"):
        super().__init__(status_code=status.HTTP_404_NOT_FOUND, detail=detail)


class InvalidImageFormatException(HTTPException):
    def __init__(self, detail: str = "Invalid image file format or corrupted base64 data"):
        super().__init__(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)


class PredictionFailedException(HTTPException):
    def __init__(self, detail: str = "Failed to run model prediction inference"):
        super().__init__(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=detail)
