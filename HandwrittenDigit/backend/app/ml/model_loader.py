"""
Model loading service singleton for PyTorch model inference.
"""
import os
import torch
import logging
from typing import Optional
from app.ml.model_architecture import DigitCNN

logger = logging.getLogger(__name__)


class ModelLoader:
    """Singleton model manager that loads and caches the trained PyTorch weights."""
    _instance: Optional["ModelLoader"] = None
    _model: Optional[DigitCNN] = None
    _model_path: Optional[str] = None
    _device: torch.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(ModelLoader, cls).__new__(cls)
        return cls._instance

    @classmethod
    def load_model(cls, model_path: str, force_reload: bool = False) -> DigitCNN:
        """Loads weights from model_path into DigitCNN instance."""
        if cls._model is not None and not force_reload and cls._model_path == model_path:
            return cls._model

        logger.info(f"Loading digit classifier model from {model_path} onto {cls._device}")
        model = DigitCNN(num_classes=10)
        
        if os.path.exists(model_path):
            state_dict = torch.load(model_path, map_location=cls._device)
            model.load_state_dict(state_dict)
            logger.info(f"Successfully loaded model state_dict from {model_path}")
        else:
            logger.warning(f"Model file {model_path} not found. Using randomly initialized model weights.")

        model.to(cls._device)
        model.eval()
        cls._model = model
        cls._model_path = model_path
        return cls._model

    @classmethod
    def get_model(cls) -> Optional[DigitCNN]:
        return cls._model

    @classmethod
    def is_loaded(cls) -> bool:
        return cls._model is not None

    @classmethod
    def get_device(cls) -> torch.device:
        return cls._device
