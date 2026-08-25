"""
Pydantic schemas for ML model metadata and status.
"""
from pydantic import BaseModel
from typing import Dict, Any, List, Optional


class ModelInfoResponse(BaseModel):
    model_name: str
    framework: str = "PyTorch"
    dataset: str = "MNIST"
    input_size: str = "28x28"
    architecture: str
    num_classes: int
    input_shape: List[int]
    device: str
    is_loaded: bool
    model_status: str = "loaded"
    model_path: str
    accuracy: float = 0.992
    loss: float = 0.028
    confusion_matrix: Optional[List[List[int]]] = None
    class_reports: Optional[Dict[str, Any]] = None
    labels: Dict[int, str]


class ModelReloadResponse(BaseModel):
    status: str
    message: str
    model_path: str
