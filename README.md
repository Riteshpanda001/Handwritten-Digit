# Handwritten Digit Classification

An interactive, production-grade web application for real-time handwritten digit recognition (0–9), powered by a PyTorch 2D Convolutional Neural Network (CNN), OpenCV image preprocessing and auto-centering, a high-performance FastAPI REST server, and a modern React + Vite frontend styled with the Midnight Vision design system.

---

## 🌟 Key Features & Upgrade Architecture

1. **Real-Time Digit Prediction**:
   - **Drawing Canvas**: Interactive HTML5 canvas with customizable brush sizes, eraser mode, and clearing.
   - **Image Upload**: Drag-and-drop or click to upload PNG, JPG, BMP, or WebP digit images.
   - **Auto-Centering & Normalization**: Custom OpenCV preprocessing pipeline that extracts the digit contour, crops bounding box, resizes to a 20x20 box preserving aspect ratio, pads onto a 28x28 black canvas, and calculates PyTorch normalization.

2. **PyTorch Deep Learning Engine**:
   - **Model Architecture**: 2D CNN with 2 Convolutional blocks (Conv2D, BatchNorm2D, ReLU, MaxPool2D), Dropout regularization (0.25 & 0.50), and Fully-Connected Dense layers.
   - **Trained Weights**: Stored in `backend/models/digit_classifier.pt`.
   - **Softmax Analytics**: Returns top predicted digit, confidence percentage, and complete 10-class softmax probability distribution.

3. **Secure Authentication & User Isolation**:
   - Real bcrypt password hashing (`passlib` & `bcrypt`).
   - Signed JSON Web Tokens (JWT) using PyJWT with expiration bounds.
   - User-isolated prediction history logging stored in SQLite.

4. **Model Performance & History Dashboard**:
   - **Model Page (`/model`)**: Dataset specs, PyTorch CNN architecture breakdown, evaluation metrics (accuracy, loss), and a 10x10 confusion matrix.
   - **History Page (`/history`)**: Filter predictions by digit (0–9), inspect past confidence levels, and clear history logs.
   - **React Router Navigation**: Dynamic client-side routing across `/`, `/predictor`, `/model`, `/history`, `/about`, and `404` pages.

---

## 🛠️ Technology Stack

- **Frontend**: React, Vite, JavaScript (JSX), Vanilla CSS (Midnight Vision Theme), Lucide React Icons, React Router v7.
- **Backend**: Python 3.14+, FastAPI, PyTorch 2.0+, OpenCV (`opencv-python-headless`), PIL, SQLAlchemy, SQLite, PyJWT, Bcrypt, Pytest.

---

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.9+
- Node.js 18+ and npm

---

### 1. Backend Setup & Server Execution

```bash
# Navigate to the Backend directory
cd Backend

# Install dependencies
pip install -r requirements.txt

# Run database table migrations and evaluation metrics generator
python training/generate_metrics.py

# Start the FastAPI dev server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
- API Base URL: `http://localhost:8000/api/v1`
- Interactive Swagger OpenAPI Docs: `http://localhost:8000/docs`

---

### 2. Frontend Setup & Web App Execution

```bash
# Open a new terminal and navigate to the Frontend directory
cd Frontend

# Install frontend packages
npm install

# Start Vite dev server
npm run dev
```
- Web Application: `http://localhost:5173`

---

## 📡 API Endpoint Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/health` | Service health status check |
| `POST` | `/api/v1/predict/canvas` | Accepts base64 canvas image data URL for digit prediction |
| `POST` | `/api/v1/predict/image` | Accepts uploaded image file multipart data for digit prediction |
| `GET` | `/api/v1/model/info` | Queries model architecture, accuracy, loss, and confusion matrix |
| `POST` | `/api/v1/model/reload` | Reloads PyTorch `.pt` model weights into memory |
| `GET` | `/api/v1/history` | Retrieves paginated prediction logs (filterable by digit) |
| `DELETE` | `/api/v1/history/clear` | Clears prediction history logs |
| `POST` | `/api/v1/auth/register` | Registers a new user and returns JWT token |
| `POST` | `/api/v1/auth/login` | Authenticates user credentials and returns JWT token |
| `GET` | `/api/v1/auth/me` | Fetches authenticated user profile |

---

## 🧪 Running Backend Unit Tests

```bash
cd Backend
python -m pytest
```
All unit tests for health, prediction, image preprocessing, model reloading, and authentication pass.
