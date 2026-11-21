"""
Application Configuration settings using pydantic_settings.
"""
import os
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "Handwritten Digit Classifier API"
    API_V1_STR: str = "/api/v1"
    DATABASE_URL: str = "sqlite:///./predictions.db"
    
    # Path settings
    BASE_DIR: str = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    MODEL_PATH: str = os.path.join(BASE_DIR, "models", "digit_classifier.pt")
    UPLOAD_DIR: str = os.path.join(BASE_DIR, "uploads")
    ARCHIVE_DIR: str = os.path.join(os.path.dirname(BASE_DIR), "archive")

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
