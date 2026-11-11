"""
Unit tests for model architecture and inference predictor.
"""
import sys
import os
import torch

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.ml.model_architecture import DigitCNN
from app.ml.predictor import DigitPredictor
from app.config import settings


def test_digit_cnn_forward():
    model = DigitCNN(num_classes=10)
    model.eval()
    dummy_input = torch.randn(2, 1, 28, 28)
    output = model(dummy_input)
    assert output.shape == (2, 10)


def test_digit_predictor():
    predictor = DigitPredictor(settings.MODEL_PATH)
    dummy_input = torch.zeros((1, 28, 28), dtype=torch.float32)
    dummy_input[0, 10:18, 10:18] = 1.0
    result = predictor.predict(dummy_input)

    assert "predicted_digit" in result
    assert 0 <= result["predicted_digit"] <= 9
    assert "confidence" in result
    assert len(result["probabilities"]) == 10
