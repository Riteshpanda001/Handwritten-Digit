"""
Application Configuration settings using pydantic_settings.
"""
import os
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

DEFAULT_SECRET_KEY = "digit_classifier_secret_key_super_secure_99"


class Settings(BaseSettings):
    PROJECT_NAME: str = "Handwritten Digit Classifier API"
    API_V1_STR: str = "/api/v1"
    DATABASE_URL: str = "sqlite:///./predictions.db"
    
    # Path settings
    BASE_DIR: str = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    MODEL_PATH: str = os.path.join(BASE_DIR, "models", "digit_classifier.pt")
    UPLOAD_DIR: str = os.path.join(BASE_DIR, "uploads")
    ARCHIVE_DIR: str = os.path.join(os.path.dirname(BASE_DIR), "archive")

    # Security options
    SECRET_KEY: str = DEFAULT_SECRET_KEY
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours

    @field_validator("SECRET_KEY", mode="before")
    @classmethod
    def default_secret_if_empty(cls, v: str | None) -> str:
        if v is None or (isinstance(v, str) and not v.strip()):
            return DEFAULT_SECRET_KEY
        return v

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
