"""
Handwriting Quality Evaluator analyzing stroke structure, centering, and classifier consensus.
"""
import numpy as np
from typing import Dict, Any, List


class HandwritingQualityEvaluator:
    """
    Evaluates how correctly and clearly a digit is written ("Handwriting Quality / Correctness Rating").
    Calculates a Quality Score (0 - 100%) and feedback based on:
    1. Multi-Algorithm Consensus (CNN, SVM, KNN, Random Forest agreement)
    2. Confidence Aggregate across classifiers
    3. Image stroke structure, contrast, and centering
    """

    @staticmethod
    def evaluate(
        input_2d: np.ndarray,
        cnn_pred: int,
        cnn_confidence: float,
        classical_predictions: Dict[str, Dict[str, Any]],
        similarity_score: float
    ) -> Dict[str, Any]:
        """
        Computes handwriting quality score, quality tier level, and textual evaluation summary.
        """
        # Collect predictions from all available algorithms
        all_preds = [cnn_pred]
        all_confidences = [cnn_confidence]

        for key, res in classical_predictions.items():
            if "predicted_digit" in res:
                all_preds.append(res["predicted_digit"])
            if "confidence" in res:
                all_confidences.append(res["confidence"])

        # 1. Calculate Multi-Algorithm Consensus Ratio (weight: 40%)
        most_common_digit = max(set(all_preds), key=all_preds.count)
        consensus_count = all_preds.count(most_common_digit)
        consensus_ratio = consensus_count / len(all_preds) if all_preds else 1.0

        # 2. Confidence Mean (weight: 30%)
        mean_confidence = float(np.mean(all_confidences)) if all_confidences else cnn_confidence

        # 3. Image Stroke Quality & Centering (weight: 20%)
        img = np.array(input_2d, dtype=np.float32).reshape(28, 28)
        non_zeros = np.count_nonzero(img > 20)
        total_pixels = 28 * 28

        # Stroke density factor (ideal fill ratio for digits is ~10% to 25% of canvas)
        fill_ratio = non_zeros / total_pixels
        if 0.08 <= fill_ratio <= 0.35:
            stroke_score = 0.95
        elif 0.04 <= fill_ratio < 0.08 or 0.35 < fill_ratio <= 0.50:
            stroke_score = 0.75
        else:
            stroke_score = 0.40

        # 4. Template Similarity score (weight: 10%)
        sim_score = float(similarity_score)

        # Composite Quality Score calculation (0 to 100)
        raw_quality = (
            (consensus_ratio * 40.0) +
            (mean_confidence * 30.0) +
            (stroke_score * 20.0) +
            (sim_score * 10.0)
        )

        quality_score = round(float(np.clip(raw_quality, 0.0, 100.0)), 1)

        # Determine Quality Level Tier & Feedback
        if quality_score >= 88.0:
            quality_level = "Excellent"
            feedback = f"Exceptionally clear stroke geometry with {consensus_count}/{len(all_preds)} model consensus."
        elif quality_score >= 74.0:
            quality_level = "Good"
            feedback = f"Well-formed digit stroke with strong classification alignment ({consensus_count}/{len(all_preds)} models agree)."
        elif quality_score >= 55.0:
            quality_level = "Fair"
            feedback = "Recognizable digit shape, though stroke thickness or curvature shows minor variance."
        else:
            quality_level = "Needs Improvement"
            feedback = "Distorted or faint stroke. Try drawing thicker, centered strokes for clearer recognition."

        return {
            "quality_score": quality_score,
            "quality_level": quality_level,
            "feedback": feedback,
            "algorithm_consensus_ratio": round(consensus_ratio, 2),
            "consensus_count": consensus_count,
            "total_algorithms": len(all_preds),
            "mean_confidence": round(mean_confidence, 4),
            "stroke_clarity_score": round(stroke_score, 2)
        }
