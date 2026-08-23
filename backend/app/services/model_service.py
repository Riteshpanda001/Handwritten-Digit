"""
Model service providing inspection and model re-loading functionality.
"""
import os
from typing import Dict, Any
from app.ml.model_loader import ModelLoader
from app.ml.class_labels import CLASS_LABELS


class ModelService:
    """Service to query model architecture status and manage reloads."""

    def __init__(self, model_path: str):
        self.model_path = model_path

    def get_info(self) -> Dict[str, Any]:
        """Returns details about loaded classifier model."""
        is_loaded = ModelLoader.is_loaded()
        device_str = str(ModelLoader.get_device())

        return {
            "model_name": "DigitClassifierCNN",
            "architecture": "PyTorch 2D-CNN (2 Conv Blocks, BatchNorm, Dropout, Linear)",
            "num_classes": 10,
            "input_shape": [1, 1, 28, 28],
            "device": device_str,
            "is_loaded": is_loaded,
            "model_path": self.model_path,
            "labels": CLASS_LABELS,
        }

    def reload(self) -> Dict[str, Any]:
        """Forces model reload from disk."""
        ModelLoader.load_model(self.model_path, force_reload=True)
        return {
            "status": "success",
            "message": f"Successfully reloaded model from {self.model_path}",
            "model_path": self.model_path
        }
