"""
Utility functions for image validation, saving uploads, and base64 handling.
"""
import os
import uuid
import base64
from app.core.exceptions import InvalidImageFormatException
from app.core.constants import SUPPORTED_IMAGE_TYPES


def save_upload_bytes(upload_dir: str, file_bytes: bytes, original_filename: str) -> str:
    """Saves raw uploaded image bytes to upload directory and returns unique filename."""
    os.makedirs(upload_dir, exist_ok=True)
    ext = os.path.splitext(original_filename)[1] or ".png"
    unique_filename = f"{uuid.uuid4().hex}{ext}"
    target_path = os.path.join(upload_dir, unique_filename)
    with open(target_path, "wb") as f:
        f.write(file_bytes)
    return unique_filename


def validate_content_type(content_type: str):
    """Validates if image content type is supported."""
    if content_type not in SUPPORTED_IMAGE_TYPES:
        raise InvalidImageFormatException(
            f"Unsupported content type: {content_type}. Supported: {SUPPORTED_IMAGE_TYPES}"
        )
