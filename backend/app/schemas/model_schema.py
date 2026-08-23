"""
Pydantic schemas for ML model metadata and status.
"""
from pydantic import BaseModel
from typing import Dict, Any, List


class ModelInfoResponse(BaseModel):
    model_name: str
    architecture: str
    num_classes: int
    input_shape: List[int]
    device: str
    is_loaded: bool
    model_path: str
    labels: Dict[int, str]


class ModelReloadResponse(BaseModel):
    status: str
    message: str
    model_path: str
