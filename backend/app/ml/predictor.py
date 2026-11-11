"""
Predictor wrapper that accepts input tensors and produces structured multi-algorithm prediction outputs.
"""
import os
import torch
import torch.nn.functional as F
import numpy as np
from typing import Dict, List, Any, Tuple

from app.ml.model_loader import ModelLoader
from app.ml.class_labels import CLASS_LABELS, DIGIT_NAMES
from app.ml.classical_models import ClassicalMLPredictor
from app.ml.similarity_engine import ImageSimilarityEngine
from app.ml.quality_evaluator import HandwritingQualityEvaluator


class DigitPredictor:
    """Inference runner for CNN, SVM, KNN, Random Forest, Quality rating, and Image Similarity analysis."""

    def __init__(self, model_path: str):
        self.model_path = model_path
        artifacts_dir = os.path.join(os.path.dirname(self.model_path), "..", "app", "ml", "artifacts")
        if not os.path.exists(artifacts_dir):
            artifacts_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "artifacts")

        self.artifacts_dir = os.path.abspath(artifacts_dir)
        self.classical_predictor = ClassicalMLPredictor(self.artifacts_dir)
        self.similarity_engine = ImageSimilarityEngine(self.artifacts_dir)

    def predict(self, tensor_input: torch.Tensor) -> Dict[str, Any]:
        """
        Executes prediction on 4D tensor input (B, 1, 28, 28) or 3D (1, 28, 28).
        Returns top digit prediction, PyTorch CNN probabilities, SVM, KNN, Random Forest predictions,
        handwriting quality rating, and image similarity analysis.
        """
        model = ModelLoader.load_model(self.model_path)
        device = ModelLoader.get_device()

        if tensor_input.dim() == 3:
            tensor_input = tensor_input.unsqueeze(0)  # Add batch dimension

        tensor_input = tensor_input.to(device)

        # Check if input tensor is completely blank (all black pixels / no drawn stroke)
        if torch.max(tensor_input) < 0.05 or torch.sum(tensor_input) < 0.1:
            raise ValueError("Input drawing canvas or image is blank. Please draw a digit (0-9) before predicting.")

        # 1. CNN Model Inference
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

        # Extract 2D numpy array (28, 28) for classical algorithms & similarity
        img_np = tensor_input.cpu().numpy()[0, 0]

        # 2. Classical ML Inference (SVM, KNN, Random Forest)
        classical_preds = self.classical_predictor.predict_all(img_np)

        algorithm_predictions = {
            "cnn": {
                "model_name": "2D Convolutional Neural Network (PyTorch)",
                "algorithm_key": "cnn",
                "predicted_digit": predicted_digit,
                "confidence": confidence,
                "accuracy_score": 0.992,
                "probabilities": probabilities_dict
            }
        }
        algorithm_predictions.update(classical_preds)

        # 3. Image Similarity Engine
        similarity_analysis = self.similarity_engine.calculate_similarity(img_np, predicted_digit)

        # 4. Handwriting Quality Rating Evaluator
        quality_analysis = HandwritingQualityEvaluator.evaluate(
            input_2d=img_np,
            cnn_pred=predicted_digit,
            cnn_confidence=confidence,
            classical_predictions=classical_preds,
            similarity_score=similarity_analysis["overall_similarity_score"]
        )

        return {
            "predicted_digit": predicted_digit,
            "digit_name": DIGIT_NAMES[predicted_digit],
            "confidence": confidence,
            "confidence_scores": probabilities_dict,
            "probabilities": probabilities_list,
            "algorithm_predictions": algorithm_predictions,
            "handwriting_quality": quality_analysis,
            "image_similarity": similarity_analysis
        }
