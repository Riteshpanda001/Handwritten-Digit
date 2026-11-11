"""
Training script for classical ML models (SVM, KNN, Random Forest) and digit templates computation.
"""
import os
import sys
import numpy as np

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from training.dataset import load_idx_images, load_idx_labels
from app.ml.classical_models import ClassicalMLPredictor
from app.ml.similarity_engine import ImageSimilarityEngine


def train_classical_suite():
    archive_dir = os.path.join(os.path.dirname(BASE_DIR), "archive")
    artifacts_dir = os.path.join(BASE_DIR, "app", "ml", "artifacts")
    os.makedirs(artifacts_dir, exist_ok=True)

    train_img_path = os.path.join(archive_dir, "train-images.idx3-ubyte")
    train_lbl_path = os.path.join(archive_dir, "train-labels.idx1-ubyte")

    if os.path.exists(train_img_path) and os.path.exists(train_lbl_path):
        print("Loading MNIST subset from local archive for classical ML training...")
        images = load_idx_images(train_img_path, max_samples=2500)
        labels = load_idx_labels(train_lbl_path, max_samples=2500)

        X_sub = images.astype(np.float32) / 255.0
        y_sub = labels

        # Fit classical ML algorithms
        predictor = ClassicalMLPredictor(artifacts_dir)
        predictor.train_and_save_models(X_sub, y_sub)

        # Compute & save digit prototype template averages
        sim_engine = ImageSimilarityEngine(artifacts_dir)
        sim_engine.update_templates_from_dataset(images, labels)
        print("Successfully trained classical models and saved digit templates.")
    else:
        print("MNIST archive files not found. Initializing fallback models.")
        predictor = ClassicalMLPredictor(artifacts_dir)
        predictor.train_and_save_models()


if __name__ == "__main__":
    train_classical_suite()
