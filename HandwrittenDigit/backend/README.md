# Handwritten Digit Classification - Backend API & Training Pipeline

A robust, production-ready, modular REST backend for handwritten digit classification built with **FastAPI**, **PyTorch**, **SQLAlchemy**, and **OpenCV**.

---

## 📁 Architecture & Directory Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                  # FastAPI App Entrypoint
│   ├── config.py                # Environment & App Settings
│   ├── dependencies.py          # Service & DB Dependency Injection
│   │
│   ├── api/
│   │   ├── __init__.py
│   │   └── routes/
│   │       ├── __init__.py
│   │       ├── health_routes.py # /api/v1/health
│   │       ├── prediction_routes.py # /api/v1/predict/canvas & /image
│   │       ├── model_routes.py  # /api/v1/model/info & /reload
│   │       └── history_routes.py# /api/v1/history & /clear
│   │
│   ├── schemas/                 # Pydantic Request & Response Schemas
│   │   ├── __init__.py
│   │   ├── prediction_schema.py
│   │   ├── model_schema.py
│   │   └── history_schema.py
│   │
│   ├── services/                # Business Logic Layer
│   │   ├── __init__.py
│   │   ├── prediction_service.py
│   │   ├── preprocessing_service.py
│   │   ├── model_service.py
│   │   └── history_service.py
│   │
│   ├── ml/                      # PyTorch Neural Net & Inference
│   │   ├── __init__.py
│   │   ├── model_architecture.py# DigitCNN architecture
│   │   ├── model_loader.py    # Singleton model loader
│   │   ├── predictor.py       # Softmax confidence & class mapping
│   │   └── class_labels.py    # 0-9 labels
│   │
│   ├── preprocessing/           # Image Processing & Canvas Handling
│   │   ├── __init__.py
│   │   ├── image_processor.py # Auto-bounding box & centering (MNIST format)
│   │   ├── canvas_processor.py# Base64 data URL decoding
│   │   └── normalization.py   # Tensor scaling & normalization
│   │
│   ├── database/                # Persistence Layer
│   │   ├── __init__.py
│   │   ├── connection.py      # SQLAlchemy SQLite engine
│   │   ├── models.py          # Prediction history table
│   │   └── repositories.py    # History CRUD queries
│   │
│   ├── utils/                   # Helper Utilities
│   │   ├── __init__.py
│   │   ├── image_utils.py
│   │   ├── response_utils.py
│   │   └── logger.py
│   │
│   └── core/                    # Core definitions & Exception handlers
│       ├── __init__.py
│       ├── constants.py
│       └── exceptions.py
│
├── models/
│   └── digit_classifier.pt      # Trained PyTorch CNN weights
│
├── training/                    # Dataset parsing & Model Training
│   ├── train.py                 # Training script (99%+ accuracy)
│   ├── evaluate.py              # Confusion matrix & classification report
│   ├── dataset.py               # IDX binary parser for archive/ files
│   └── experiments/
│
├── tests/                       # Pytest Test Suite
│   ├── __init__.py
│   ├── test_health.py
│   ├── test_prediction.py
│   ├── test_preprocessing.py
│   └── test_model.py
│
├── uploads/                     # Image upload log directory
│   └── .gitkeep
│
├── notebooks/                   # Interactive Jupyter notebook
│   └── handwritten_digit_training.ipynb
│
├── requirements.txt
├── .env
├── .env.example
├── .gitignore
├── Dockerfile
└── README.md
```

---

## ⚡ Quick Start

### 1. Requirements & Setup
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
```

### 2. Train the CNN Model from Dataset
The dataset files in `archive/` are automatically parsed by `dataset.py`.
```bash
python training/train.py
```
This trains the CNN and saves the model weights to `models/digit_classifier.pt`.

To evaluate classification performance:
```bash
python training/evaluate.py
```

### 3. Run the Backend API Server
```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```
- Interactive Swagger UI: `http://127.0.0.1:8000/docs`
- ReDoc API Docs: `http://127.0.0.1:8000/redoc`

---

## 🔌 API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/health` | Application health and model readiness check |
| `POST` | `/api/v1/predict/canvas` | Predict digit from Base64 drawing canvas payload |
| `POST` | `/api/v1/predict/image` | Predict digit from uploaded image file (PNG/JPG/WebP) |
| `GET` | `/api/v1/model/info` | Inspect model architecture and confidence label mappings |
| `POST` | `/api/v1/model/reload` | Force reload model weights from disk |
| `GET` | `/api/v1/history` | Paginated query for prediction logs |
| `DELETE` | `/api/v1/history/clear` | Clear prediction history database records |

---

## 🧪 Running Unit Tests

```bash
pytest
```

---

## 🐳 Docker Deployment

```bash
docker build -t handwritten-digit-backend .
docker run -p 8000:8000 handwritten-digit-backend
```
