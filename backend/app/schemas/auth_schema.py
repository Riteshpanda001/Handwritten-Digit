"""
Pydantic Validation Schemas for User Authentication.
"""
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


class UserRegisterRequest(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100, example="Arjun Dev")
    email: EmailStr = Field(..., example="arjun@example.com")
    password: str = Field(..., min_length=6, example="secret123")


class UserLoginRequest(BaseModel):
    email: EmailStr = Field(..., example="arjun@example.com")
    password: str = Field(..., example="secret123")


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    created_at: datetime

    class Config:
        from_attributes = True


class AuthTokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
