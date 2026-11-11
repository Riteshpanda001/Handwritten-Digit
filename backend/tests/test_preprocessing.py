"""
Unit tests for image and canvas preprocessing.
"""
import sys
import os
import torch
import numpy as np
from PIL import Image
import io
import base64

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.preprocessing.image_processor import ImageProcessor
from app.preprocessing.canvas_processor import CanvasProcessor
from app.preprocessing.normalization import normalize_image, to_tensor


def test_normalization():
    arr = np.array([[0, 127.5, 255]], dtype=np.float32)
    norm = normalize_image(arr)
    assert norm[0, 0] == 0.0
    assert norm[0, 2] == 1.0

    tensor = to_tensor(arr)
    assert isinstance(tensor, torch.Tensor)
    assert tensor.dim() == 3
    assert tensor.shape == (1, 1, 3)


def test_image_processor_center_and_resize():
    # Create synthetic 100x100 white canvas with black box
    img = Image.new("L", (100, 100), color=255)
    img_arr = np.array(img)
    img_arr[30:70, 30:70] = 0  # Black square

    processed = ImageProcessor.center_and_resize(img_arr)
    assert processed.shape == (28, 28)
    assert isinstance(processed, np.ndarray)


def test_canvas_processor():
    # Create simple base64 PNG image
    img = Image.new("L", (50, 50), color=0)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    b64_str = "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode("utf-8")

    tensor = CanvasProcessor.process_canvas_data(b64_str)
    assert isinstance(tensor, torch.Tensor)
    assert tensor.shape == (1, 28, 28)
