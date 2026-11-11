"""
Evaluation script for Handwritten Digit Classifier.
"""
import os
import sys
import torch
import numpy as np
from sklearn.metrics import classification_report, confusion_matrix

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from training.dataset import get_data_loaders
from app.ml.model_architecture import DigitCNN


def evaluate_model(archive_dir: str, model_path: str):
    """Evaluates stored model weights against the test set and prints precision/recall report."""
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Evaluating model {model_path} on {device}...")

    _, test_loader = get_data_loaders(archive_dir, batch_size=64)

    model = DigitCNN(num_classes=10)
    model.load_state_dict(torch.load(model_path, map_location=device))
    model.to(device)
    model.eval()

    all_preds = []
    all_targets = []

    with torch.no_grad():
        for images, labels in test_loader:
            images = images.to(device)
            outputs = model(images)
            _, predicted = torch.max(outputs, 1)

            all_preds.extend(predicted.cpu().numpy())
            all_targets.extend(labels.numpy())

    all_preds = np.array(all_preds)
    all_targets = np.array(all_targets)

    print("\n--- Classification Report ---")
    print(classification_report(all_targets, all_preds, target_names=[f"Digit {i}" for i in range(10)]))

    print("\n--- Confusion Matrix ---")
    print(confusion_matrix(all_targets, all_preds))


if __name__ == "__main__":
    archive_directory = os.path.join(os.path.dirname(BASE_DIR), "archive")
    model_file_path = os.path.join(BASE_DIR, "models", "digit_classifier.pt")
    evaluate_model(archive_directory, model_file_path)
