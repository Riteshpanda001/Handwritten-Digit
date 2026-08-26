# 🖊️ Handwritten Digit Classification & Recognition System

An end-to-end, production-grade web application for real-time handwritten digit recognition (0–9). Powered by a custom **PyTorch 2D Convolutional Neural Network (CNN)**, **OpenCV** image auto-centering and preprocessing pipeline, a high-performance **FastAPI** REST backend, and a modern **React + Vite** frontend styled with the *Midnight Vision* design system.

---

## 📁 Complete Project Structure

```
HandwrittenDigit/
├── archive/                             # Raw MNIST dataset archive files (IDX format)
│   ├── t10k-images-idx3-ubyte.gz
│   ├── t10k-labels-idx1-ubyte.gz
│   ├── train-images-idx3-ubyte.gz
│   └── train-labels-idx1-ubyte.gz
│
├── backend/                             # Python FastAPI REST Server & PyTorch ML Engine
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/                  # API Endpoint Controllers
│   │   │       ├── auth_routes.py       # User authentication & JWT management
│   │   │       ├── health_routes.py     # System & model health check
│   │   │       ├── history_routes.py    # Prediction logs & database CRUD
│   │   │       ├── model_routes.py      # Model metadata, specs & weight reloading
│   │   │       └── prediction_routes.py # Canvas base64 & image upload inferencing
│   │   ├── core/                        # Global Constants & Exception Handlers
│   │   ├── database/                    # SQLAlchemy ORM, SQLite DB & Repositories
│   │   ├── ml/                          # PyTorch Neural Network & Inference Logic
│   │   │   ├── class_labels.py
│   │   │   ├── model_architecture.py   # DigitCNN ConvNet Definition
│   │   │   ├── model_loader.py         # Singleton Model Loader
│   │   │   └── predictor.py            # Softmax Confidence & Top-K Predictions
│   │   ├── preprocessing/               # OpenCV Preprocessing Pipeline
│   │   │   ├── canvas_processor.py     # Base64 string decoding
│   │   │   ├── image_processor.py      # Contour extraction & auto-centering
│   │   │   └── normalization.py        # PyTorch Tensor normalization
│   │   ├── schemas/                     # Pydantic Request/Response Validation Schemas
│   │   ├── services/                    # Business Logic Layer
│   │   ├── utils/                       # Image Utilities & Custom Logging
│   │   ├── config.py                    # Environment Configuration & App Settings
│   │   ├── dependencies.py              # FastAPI Dependency Injections
│   │   └── main.py                      # FastAPI Application Entrypoint
│   ├── models/                          # Trained Weights Storage
│   │   └── digit_classifier.pt          # PyTorch Model Checkpoint
│   ├── notebooks/                       # Training & Analysis Jupyter Notebooks
│   │   └── handwritten_digit_training.ipynb
│   ├── tests/                           # Pytest Automated Test Suite
│   │   ├── test_health.py
│   │   ├── test_model.py
│   │   ├── test_prediction.py
│   │   └── test_preprocessing.py
│   ├── training/                        # Dataset Parsers & Model Training Scripts
│   │   ├── dataset.py                   # IDX Binary Parser
│   │   ├── evaluate.py                 # Performance metrics & confusion matrix generator
│   │   ├── generate_metrics.py         # Evaluation exporter
│   │   └── train.py                     # CNN Training Loop (99%+ Accuracy)
│   ├── uploads/                         # Temporary storage for uploaded test images
│   ├── venv/                            # Python Virtual Environment
│   ├── .env                             # Environment Variables Config
│   ├── Dockerfile                       # Backend Containerization Spec
│   └── requirements.txt                 # Backend Python Dependencies
│
├── Frontend/                            # React + Vite Web Application
│   ├── public/                          # Static Assets & Icons
│   ├── src/
│   │   ├── components/                  # Reusable UI Components
│   │   │   ├── history/                 # Prediction History Table & Filters
│   │   │   ├── home/                    # Hero Banner & Quick Actions
│   │   │   ├── layout/                  # Navigation Bar & Footer Layouts
│   │   │   ├── model/                   # Model Architecture & Metric Cards
│   │   │   └── predictor/               # HTML5 Drawing Canvas & Drag-and-Drop Uploader
│   │   ├── pages/                       # React Router Page Views
│   │   │   ├── About.jsx                # Project Overview & System Specs
│   │   │   ├── History.jsx              # Historical Predictions Log Page
│   │   │   ├── Home.jsx                 # Landing View
│   │   │   ├── Model.jsx                # CNN Architecture & Metrics Dashboard
│   │   │   ├── NotFound.jsx             # 404 Error View
│   │   │   └── Predictor.jsx            # Interactive Prediction Workstation
│   │   ├── services/                    # Axios API Service Layer
│   │   │   └── api.js                   # REST Client endpoints
│   │   ├── styles/                      # Theme Variables & Global CSS
│   │   ├── App.jsx                      # App Shell & Router Configuration
│   │   └── main.jsx                     # React Entrypoint
│   ├── package.json                     # Frontend NPM Dependencies
│   └── vite.config.js                   # Vite Development Server Configuration
│
└── README.md                            # Comprehensive Project Documentation
```

---

## 🌟 Key Features

1. **Interactive HTML5 Drawing Canvas**:
   - Interactive drawing canvas with adjustable brush sizes, eraser mode, clear actions, and live visual output.
2. **Multi-Format Image Upload**:
   - Drag-and-drop or file picker support for PNG, JPG, BMP, and WebP digit images.
3. **OpenCV Preprocessing Engine**:
   - Contour bounding box detection, aspect-ratio preserving 20x20 scaling, 28x28 black padding, and tensor normalization matching MNIST format.
4. **PyTorch 2D CNN Architecture**:
   - Dual Convolutional blocks (Conv2D -> BatchNorm2D -> ReLU -> MaxPool2D), Dropout regularization (0.25 & 0.50), and Dense Fully-Connected layers achieving **99%+ test accuracy**.
5. **Softmax Confidence Analytics**:
   - Real-time prediction rendering top digit, percentage confidence, and a complete 10-class probability distribution bar chart.
6. **Prediction Logs & Persistence**:
   - SQLite database storing prediction timestamps, confidence scores, input types (canvas vs upload), and classified digits with filtering and deletion support.
7. **Model Analytics & Evaluation Dashboard**:
   - Dedicated `/model` view displaying CNN layer structure, dataset statistics, performance evaluation metrics, and a confusion matrix visualization.

---

## 🛠️ Technology Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, JavaScript (JSX), Vanilla CSS (Midnight Vision Theme), Lucide React Icons, React Router v7 |
| **Backend** | Python 3.14+, FastAPI, PyTorch 2.0+, OpenCV (`opencv-python-headless`), Pillow, SQLAlchemy 2.0, SQLite, Pydantic v2 |
| **Authentication & Security** | PyJWT (JSON Web Tokens), Passlib (Bcrypt hashing) |
| **Testing & Deployment** | Pytest, Uvicorn, Docker, Axios |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Python**: 3.9+ installed
- **Node.js**: v18+ and `npm` installed

---

### 1. Backend Server Setup & Execution

```bash
# 1. Navigate to backend directory
cd backend

# 2. Activate virtual environment
# On Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# On Windows (CMD):
venv\Scripts\activate.bat
# On Linux/macOS:
source venv/bin/activate

# 3. Install Python dependencies (if needed)
pip install -r requirements.txt

# 4. Run metrics generator / database table initialization
python training/generate_metrics.py

# 5. Start FastAPI development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
- **Backend API Base URL**: `http://localhost:8000/api/v1`
- **Interactive Swagger Docs**: `http://localhost:8000/docs`
- **ReDoc API Docs**: `http://localhost:8000/redoc`

---

### 2. Frontend Web App Execution

```bash
# Open a new terminal window and navigate to Frontend directory
cd Frontend

# Install frontend dependencies (if needed)
npm install

# Start Vite dev server
npm run dev
```
- **Frontend Web Application**: `http://localhost:5173`

---

## 📡 REST API Endpoint Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/health` | Service health status check & model load status |
| `POST` | `/api/v1/predict/canvas` | Accepts Base64 canvas drawing string & returns predicted digit with confidence array |
| `POST` | `/api/v1/predict/image` | Accepts uploaded image file (multipart/form-data) for digit classification |
| `GET` | `/api/v1/model/info` | Queries CNN layer specs, accuracy/loss, and confusion matrix |
| `POST` | `/api/v1/model/reload` | Force reloads PyTorch `.pt` model weights into memory |
| `GET` | `/api/v1/history` | Retrieves paginated prediction logs (supports `digit` filtering) |
| `DELETE` | `/api/v1/history/clear` | Clears prediction history database records |
| `POST` | `/api/v1/auth/register` | Registers a new user account & returns JWT bearer token |
| `POST` | `/api/v1/auth/login` | Authenticates user credentials & returns JWT bearer token |
| `GET` | `/api/v1/auth/me` | Returns current authenticated user profile |

---

## 🧪 Running Backend Unit Tests

```bash
cd backend
python -m pytest
```

---

## 🐳 Docker Deployment

```bash
cd backend
docker build -t handwritten-digit-backend .
docker run -p 8000:8000 handwritten-digit-backend
```
