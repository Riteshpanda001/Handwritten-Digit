"""
Image processing pipeline for digit extraction, bounding-box auto-centering, and scaling.
"""
import cv2
import numpy as np
from PIL import Image
import io
import torch
from app.preprocessing.normalization import to_tensor


class ImageProcessor:
    """Processes raw uploaded images or image bytes into standard 28x28 MNIST format."""

    @staticmethod
    def bytes_to_pil(image_bytes: bytes) -> Image.Image:
        """Loads raw bytes into PIL Image."""
        return Image.open(io.BytesIO(image_bytes)).convert("L")

    @staticmethod
    def center_and_resize(img_array: np.ndarray) -> np.ndarray:
        """
        Centers the digit using center-of-mass / bounding box bounding
        and resizes it to 28x28 grayscale matching MNIST formatting.
        - Background should be 0 (black), stroke 255 (white).
        """
        # Threshold image to ensure clean binary mask
        _, thresh = cv2.threshold(img_array, 10, 255, cv2.THRESH_BINARY)

        # Check if digit background is inverted (white background, black stroke)
        if np.mean(img_array) > 127:
            img_array = 255 - img_array
            _, thresh = cv2.threshold(img_array, 10, 255, cv2.THRESH_BINARY)

        # Find non-zero pixel coordinates (digit stroke)
        coords = cv2.findNonZero(thresh)

        if coords is None:
            # Empty canvas / blank image, return 28x28 zeros
            return np.zeros((28, 28), dtype=np.float32)

        x, y, w, h = cv2.boundingRect(coords)

        # Crop the bounding region around the digit
        digit_crop = img_array[y:y+h, x:x+w]

        # Resize digit to fit inside 20x20 box preserving aspect ratio
        if w > h:
            new_w = 20
            new_h = int(h * (20.0 / w))
        else:
            new_h = 20
            new_w = int(w * (20.0 / h))

        new_w = max(1, new_w)
        new_h = max(1, new_h)

        resized_digit = cv2.resize(digit_crop, (new_w, new_h), interpolation=cv2.INTER_AREA)

        # Create a blank 28x28 canvas (black)
        padded_canvas = np.zeros((28, 28), dtype=np.uint8)

        # Calculate centering offsets for 28x28 box
        start_x = (28 - new_w) // 2
        start_y = (28 - new_h) // 2

        padded_canvas[start_y:start_y+new_h, start_x:start_x+new_w] = resized_digit

        return padded_canvas.astype(np.float32)

    @classmethod
    def process_image_bytes(cls, image_bytes: bytes) -> torch.Tensor:
        """Converts image bytes directly to normalized PyTorch tensor (1, 28, 28)."""
        pil_img = cls.bytes_to_pil(image_bytes)
        img_array = np.array(pil_img, dtype=np.uint8)
        processed_array = cls.center_and_resize(img_array)
        return to_tensor(processed_array)
