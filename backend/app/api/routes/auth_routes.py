"""
FastAPI Router for User Authentication (Registration, Login, User Profile).
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.database.models import User
from app.core.security import hash_password, verify_password, create_access_token
from app.dependencies import get_current_user
from app.schemas.auth_schema import (
    UserRegisterRequest,
    UserLoginRequest,
    UserResponse,
    AuthTokenResponse
)

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=AuthTokenResponse, status_code=status.HTTP_201_CREATED)
def register_user(req: UserRegisterRequest, db: Session = Depends(get_db)):
    """Register a new user account."""
    existing_user = db.query(User).filter(User.email == req.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email address already exists."
        )

    hashed_pw = hash_password(req.password)
    new_user = User(
        full_name=req.full_name,
        email=req.email,
        hashed_password=hashed_pw
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = create_access_token({"sub": str(new_user.id), "email": new_user.email})
    user_resp = UserResponse.model_validate(new_user)
    return AuthTokenResponse(
        access_token=token,
        token_type="bearer",
        user=user_resp
    )


@router.post("/login", response_model=AuthTokenResponse)
def login_user(req: UserLoginRequest, db: Session = Depends(get_db)):
    """Log in an existing user."""
    user = db.query(User).filter(User.email == req.email).first()
    if not user or not verify_password(req.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password credentials."
        )

    token = create_access_token({"sub": str(user.id), "email": user.email})
    user_resp = UserResponse.model_validate(user)
    return AuthTokenResponse(
        access_token=token,
        token_type="bearer",
        user=user_resp
    )


@router.get("/me", response_model=UserResponse, summary="Get Current Authenticated User Profile")
def get_me(current_user: User = Depends(get_current_user)):
    """Returns details of the currently authenticated user."""
    return current_user
