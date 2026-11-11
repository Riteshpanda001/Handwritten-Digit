"""
Image Similarity Engine comparing user handwritten inputs against benchmark MNIST digit prototypes.
"""
import os
import numpy as np
from typing import Dict, Any, List


class ImageSimilarityEngine:
    """
    Computes image similarity metrics (Cosine Similarity, Structural Correlation, and MSE distance)
    between a drawn/uploaded image and reference MNIST digit prototypes (digits 0 to 9).
    """

    def __init__(self, artifacts_dir: str):
        self.artifacts_dir = artifacts_dir
        self.templates_file = os.path.join(self.artifacts_dir, "digit_templates.npy")
        self.templates = self._load_or_create_templates()

    def _load_or_create_templates(self) -> np.ndarray:
        """Loads canonical 10x28x28 prototype templates or initializes standard digit templates."""
        if os.path.exists(self.templates_file):
            try:
                templates = np.load(self.templates_file)
                if templates.shape == (10, 28, 28):
                    return templates
            except Exception:
                pass
        return self._generate_default_prototypes()

    def _generate_default_prototypes(self) -> np.ndarray:
        """Generates standard Gaussian-based geometric prototypes for digits 0-9 as default fallback."""
        templates = np.zeros((10, 28, 28), dtype=np.float32)
        y_grid, x_grid = np.ogrid[:28, :28]
        cx, cy = 14, 14

        # Prototype 0: Elliptical ring
        dist_0 = np.sqrt((x_grid - cx) ** 2 / 36.0 + (y_grid - cy) ** 2 / 64.0)
        templates[0] = np.exp(-((dist_0 - 1.0) ** 2) / 0.15)

        # Prototype 1: Vertical line
        templates[1] = np.exp(-((x_grid - cx) ** 2) / 4.0) * (y_grid >= 4) * (y_grid <= 24)

        # Prototype 2: Upper arc + diagonal + base line
        arc_2 = np.exp(-((x_grid - cx) ** 2 + (y_grid - 9) ** 2) / 25.0)
        base_2 = (y_grid >= 22) * (y_grid <= 25) * (x_grid >= 6) * (x_grid <= 22)
        templates[2] = np.clip(arc_2 + base_2 * 0.8, 0, 1)

        # Prototype 3: Upper & lower right arcs
        arc_top_3 = np.exp(-((x_grid - 16) ** 2 + (y_grid - 9) ** 2) / 20.0)
        arc_bot_3 = np.exp(-((x_grid - 16) ** 2 + (y_grid - 19) ** 2) / 20.0)
        templates[3] = np.clip(arc_top_3 + arc_bot_3, 0, 1)

        # Prototype 4: Vertical right line + horizontal crossbar + top left diagonal
        vert_4 = (x_grid >= 17) * (x_grid <= 20) * (y_grid >= 4) * (y_grid <= 24)
        cross_4 = (y_grid >= 15) * (y_grid <= 18) * (x_grid >= 5) * (x_grid <= 22)
        templates[4] = np.clip(vert_4 * 0.9 + cross_4 * 0.9, 0, 1)

        # Prototype 5: Top bar + left stem + bottom loop
        top_5 = (y_grid >= 5) * (y_grid <= 8) * (x_grid >= 7) * (x_grid <= 21)
        loop_5 = np.exp(-((x_grid - 15) ** 2 + (y_grid - 18) ** 2) / 22.0)
        templates[5] = np.clip(top_5 * 0.8 + loop_5, 0, 1)

        # Prototype 6: Loop bottom + left arc
        loop_6 = np.exp(-((x_grid - 14) ** 2 + (y_grid - 17) ** 2) / 25.0)
        stem_6 = (x_grid >= 7) * (x_grid <= 11) * (y_grid >= 6) * (y_grid <= 17)
        templates[6] = np.clip(loop_6 + stem_6 * 0.7, 0, 1)

        # Prototype 7: Top horizontal bar + diagonal stroke
        top_7 = (y_grid >= 5) * (y_grid <= 8) * (x_grid >= 6) * (x_grid <= 22)
        diag_7 = np.exp(-((x_grid - (22 - y_grid * 0.6)) ** 2) / 6.0) * (y_grid >= 7) * (y_grid <= 24)
        templates[7] = np.clip(top_7 * 0.8 + diag_7, 0, 1)

        # Prototype 8: Figure 8 double loop
        top_8 = np.exp(-((x_grid - cx) ** 2 + (y_grid - 9) ** 2) / 18.0)
        bot_8 = np.exp(-((x_grid - cx) ** 2 + (y_grid - 19) ** 2) / 22.0)
        templates[8] = np.clip(top_8 + bot_8, 0, 1)

        # Prototype 9: Upper loop + right vertical stem
        loop_9 = np.exp(-((x_grid - 14) ** 2 + (y_grid - 10) ** 2) / 22.0)
        stem_9 = (x_grid >= 17) * (x_grid <= 20) * (y_grid >= 8) * (y_grid <= 24)
        templates[9] = np.clip(loop_9 + stem_9 * 0.8, 0, 1)

        return templates

    def update_templates_from_dataset(self, X_dataset: np.ndarray, y_dataset: np.ndarray):
        """Computes mean prototype images for each digit class 0-9 from dataset samples."""
        if len(X_dataset.shape) == 2:
            X_dataset = X_dataset.reshape(-1, 28, 28)

        new_templates = np.zeros((10, 28, 28), dtype=np.float32)
        for digit in range(10):
            mask = (y_dataset == digit)
            if np.any(mask):
                digit_samples = X_dataset[mask]
                mean_img = np.mean(digit_samples, axis=0)
                if mean_img.max() > 0:
                    mean_img = mean_img / mean_img.max()
                new_templates[digit] = mean_img.astype(np.float32)
            else:
                new_templates[digit] = self.templates[digit]

        self.templates = new_templates
        np.save(self.templates_file, self.templates)

    def calculate_similarity(self, input_2d: np.ndarray, predicted_digit: int) -> Dict[str, Any]:
        """
        Computes similarity between input 2D image (28x28) and reference digit templates 0-9.
        Returns overall similarity score, best prototype match, and per-digit similarities list.
        """
        img = np.array(input_2d, dtype=np.float32).reshape(28, 28)
        if img.max() > 1.0:
            img = img / 255.0

        img_flat = img.flatten()
        img_norm = np.linalg.norm(img_flat) + 1e-8

        similarities = []
        for digit in range(10):
            template_flat = self.templates[digit].flatten()
            temp_norm = np.linalg.norm(template_flat) + 1e-8

            # Cosine similarity
            cosine_sim = float(np.dot(img_flat, template_flat) / (img_norm * temp_norm))
            cosine_sim = float(np.clip(cosine_sim, 0.0, 1.0))

            # Mean squared error inverted similarity score
            mse = float(np.mean((img - self.templates[digit]) ** 2))
            mse_sim = float(np.exp(-3.0 * mse))

            # Combined blended similarity
            combined_score = float(np.clip(0.6 * cosine_sim + 0.4 * mse_sim, 0.0, 1.0))

            similarities.append({
                "digit": digit,
                "similarity_score": round(combined_score, 4),
                "similarity_percentage": round(combined_score * 100.0, 1),
                "cosine_similarity": round(cosine_sim, 4),
                "mse_distance": round(mse, 4)
            })

        # Find top matching template
        top_match = max(similarities, key=lambda x: x["similarity_score"])
        predicted_match = similarities[predicted_digit] if 0 <= predicted_digit <= 9 else top_match

        return {
            "top_match_digit": top_match["digit"],
            "top_similarity_percentage": top_match["similarity_percentage"],
            "predicted_digit_similarity_percentage": predicted_match["similarity_percentage"],
            "overall_similarity_percentage": predicted_match["similarity_percentage"],
            "overall_similarity_score": predicted_match["similarity_score"],
            "per_digit_similarity": similarities
        }
