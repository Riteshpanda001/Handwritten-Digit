"""
Preprocessing service encapsulating canvas/image conversion.
"""
import torch
from app.preprocessing.canvas_processor import CanvasProcessor
from app.preprocessing.image_processor import ImageProcessor


class PreprocessingService:
    """Service wrapping preprocessing pipelines."""

    @staticmethod
    def process_canvas(image_data: str) -> torch.Tensor:
        """Processes canvas base64 image data into 28x28 FloatTensor."""
        return CanvasProcessor.process_canvas_data(image_data)

    @staticmethod
    def process_image(image_bytes: bytes) -> torch.Tensor:
        """Processes raw image bytes into 28x28 FloatTensor."""
        return ImageProcessor.process_image_bytes(image_bytes)
