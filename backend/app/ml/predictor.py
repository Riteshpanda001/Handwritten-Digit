"""
Predictor wrapper that accepts input tensors and produces structured prediction outputs.
"""
import torch
import torch.nn.functional as F
import numpy as np
from typing import Dict, List, Any, Tuple
from app.ml.model_loader import ModelLoader
from app.ml.class_labels import CLASS_LABELS, DIGIT_NAMES


class DigitPredictor:
    """Inference runner for digit classification."""

    def __init__(self, model_path: str):
        self.model_path = model_path

    def predict(self, tensor_input: torch.Tensor) -> Dict[str, Any]:
        """
        Executes prediction on 4D tensor input (B, 1, 28, 28) or 3D (1, 28, 28).
        Returns top digit prediction, confidence, and full 0-9 probability distribution.
        """
        model = ModelLoader.load_model(self.model_path)
        device = ModelLoader.get_device()

        if tensor_input.dim() == 3:
            tensor_input = tensor_input.unsqueeze(0)  # Add batch dimension

        tensor_input = tensor_input.to(device)

        with torch.no_grad():
            logits = model(tensor_input)
            probabilities = F.softmax(logits, dim=1).cpu().numpy()[0]

        predicted_digit = int(np.argmax(probabilities))
        confidence = float(probabilities[predicted_digit])

        probabilities_dict = {
            int(digit): float(score) for digit, score in enumerate(probabilities)
        }

        probabilities_list = [
            {
                "digit": int(digit),
                "name": DIGIT_NAMES[digit],
                "confidence": float(score)
            }
            for digit, score in enumerate(probabilities)
        ]

        return {
            "predicted_digit": predicted_digit,
            "digit_name": DIGIT_NAMES[predicted_digit],
            "confidence": confidence,
            "confidence_scores": probabilities_dict,
            "probabilities": probabilities_list,
        }
