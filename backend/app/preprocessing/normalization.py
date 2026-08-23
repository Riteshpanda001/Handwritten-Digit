"""
Pixel intensity normalization utilities.
"""
import numpy as np
import torch


def normalize_image(img_array: np.ndarray) -> np.ndarray:
    """Normalize numpy array [0, 255] uint8 to [0.0, 1.0] float32."""
    if img_array.dtype != np.float32:
        img_array = img_array.astype(np.float32)
    if img_array.max() > 1.0:
        img_array /= 255.0
    return img_array


def to_tensor(img_array: np.ndarray) -> torch.Tensor:
    """Converts 2D (28, 28) numpy array to 3D torch FloatTensor (1, 28, 28)."""
    norm_img = normalize_image(img_array)
    tensor = torch.from_numpy(norm_img).float()
    if tensor.dim() == 2:
        tensor = tensor.unsqueeze(0)
    return tensor
