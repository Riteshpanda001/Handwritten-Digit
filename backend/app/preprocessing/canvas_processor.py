"""
Canvas processor to convert base64 data URLs from HTML5 canvas into processed digit tensors.
"""
import base64
import re
import torch
from app.preprocessing.image_processor import ImageProcessor


class CanvasProcessor:
    """Processes base64 encoded data URLs from canvas drawings."""

    @staticmethod
    def decode_base64_image(base64_string: str) -> bytes:
        """Strips data URL prefix (e.g. data:image/png;base64,) and decodes base64 string."""
        if "," in base64_string:
            base64_string = base64_string.split(",", 1)[1]
        return base64.b64decode(base64_string)

    @classmethod
    def process_canvas_data(cls, base64_string: str) -> torch.Tensor:
        """Converts base64 canvas drawing string into a 28x28 FloatTensor (1, 28, 28)."""
        image_bytes = cls.decode_base64_image(base64_string)
        return ImageProcessor.process_image_bytes(image_bytes)
