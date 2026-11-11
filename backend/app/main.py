"""
FastAPI Main Application Entrypoint.
"""
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.config import settings
from app.database.connection import init_db
from app.ml.model_loader import ModelLoader
from app.api.routes import health_routes, prediction_routes, model_routes, history_routes, auth_routes


# Initialize database tables
init_db()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup actions
    init_db()
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    os.makedirs(os.path.dirname(settings.MODEL_PATH), exist_ok=True)
    
    # Pre-load model if weights file exists
    if os.path.exists(settings.MODEL_PATH):
        ModelLoader.load_model(settings.MODEL_PATH)

    yield

    # Shutdown actions


app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    description="REST API for Handwritten Digit Classification using CNN and PyTorch",
    lifespan=lifespan
)

# CORS middleware for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers under prefix /api/v1
app.include_router(health_routes.router, prefix=settings.API_V1_STR)
app.include_router(prediction_routes.router, prefix=settings.API_V1_STR)
app.include_router(model_routes.router, prefix=settings.API_V1_STR)
app.include_router(history_routes.router, prefix=settings.API_V1_STR)
app.include_router(auth_routes.router, prefix=settings.API_V1_STR)


@app.get("/", tags=["Root"])
def root():
    return {
        "title": settings.PROJECT_NAME,
        "docs_url": "/docs",
        "api_prefix": settings.API_V1_STR
    }
