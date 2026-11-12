# 🖊️ Handwritten Digit Recognition System

An end-to-end web application that recognises handwritten digits (0–9) in real time. Draw a digit on a canvas or upload an image, and the system classifies it with a custom **PyTorch CNN**, cross-checks the result against classical ML models (**SVM, KNN, Random Forest**), and rates the quality of your handwriting.

- **Backend:** FastAPI + PyTorch + scikit-learn + OpenCV + SQLAlchemy (SQLite)
- **Frontend:** React 19 + Vite, with an interactive ML pipeline diagram built on `@xyflow/react`
- **Dataset:** MNIST (60,000 training / 10,000 test images)

---

## 🌟 Features

| Feature | Description |
| :--- | :--- |
| **Drawing canvas** | HTML5 canvas with adjustable brush size, eraser, undo and clear |
| **Image upload** | Drag-and-drop or file picker for PNG, JPG, BMP and WebP images |
| **OpenCV preprocessing** | Thresholding, contour bounding box, aspect-ratio-preserving resize, centering on a 28×28 MNIST-style frame |
| **Multi-model inference** | PyTorch CNN plus SVM, KNN and Random Forest run on the same input |
| **Confidence analytics** | Softmax confidence and a full 10-class probability distribution |
| **Handwriting quality score** | 0–100 score based on model consensus, mean confidence, stroke density and template similarity |
| **Image similarity** | Cosine similarity, correlation and MSE against mean MNIST digit templates |
| **Prediction history** | Every prediction is stored in SQLite; browse with pagination, filter by digit, or clear |
| **Model dashboard** | Accuracy, model comparison, confusion matrix and a draggable pipeline graph |

---

## 🧠 How It Works

```
Canvas / Image Upload
        │
        ▼
OpenCV Preprocessing  →  crop to digit → resize → center on 28×28 → normalise
        │
        ├──► PyTorch CNN ───────┐
        ├──► SVM (RBF)          │
        ├──► KNN (k = 3)        ├──► Consensus + Confidence
        └──► Random Forest ─────┘            │
                                             ▼
                      Template Similarity + Handwriting Quality Score
                                             │
                                             ▼
                          Final prediction  →  SQLite history  →  JSON response
```

### CNN architecture (`DigitCNN`)

| Stage | Layers |
| :--- | :--- |
| Block 1 | Conv(1→32) → BN → ReLU → Conv(32→32) → BN → ReLU → MaxPool → Dropout2d(0.25) |
| Block 2 | Conv(32→64) → BN → ReLU → Conv(64→64) → BN → ReLU → MaxPool → Dropout2d(0.25) |
| Classifier | Flatten (64×7×7) → FC(128) → BN → ReLU → Dropout(0.5) → FC(10) |

### Model comparison (MNIST test set)

| Model | Type | Accuracy |
| :--- | :--- | :---: |
| **PyTorch CNN** | Deep neural network | **99.2%** |
| SVM | RBF kernel | 97.9% |
| Random Forest | 100 trees | 96.9% |
| KNN | k = 3, distance-weighted | 96.8% |

> Figures come from `backend/app/ml/artifacts/metrics.json`. The classical models are trained on a subset of MNIST, so they score lower than the CNN.

### Handwriting quality score

`score = 40% model consensus + 30% mean confidence + 20% stroke clarity + 10% template similarity`

| Score | Level |
| :---: | :--- |
| ≥ 88 | Excellent |
| 74 – 87 | Good |
| 55 – 73 | Fair |
| < 55 | Needs Improvement |

---

## 📁 Project Structure

```
HandwrittenDigit/
├── archive/                      # MNIST dataset (IDX binary files)
├── backend/
│   ├── app/
│   │   ├── api/routes/           # health, prediction, model, history endpoints
│   │   ├── core/                 # constants, exceptions
│   │   ├── database/             # SQLAlchemy engine, models, repositories
│   │   ├── ml/
│   │   │   ├── artifacts/        # SVM/KNN/RF models, digit templates, metrics.json
│   │   │   ├── classical_models.py
│   │   │   ├── model_architecture.py
│   │   │   ├── model_loader.py
│   │   │   ├── predictor.py
│   │   │   ├── quality_evaluator.py
│   │   │   └── similarity_engine.py
│   │   ├── preprocessing/        # canvas decoding, OpenCV centering, normalisation
│   │   ├── schemas/              # Pydantic request/response models
│   │   ├── services/             # prediction, preprocessing, model, history logic
│   │   ├── utils/                # image helpers, logger
│   │   ├── config.py
│   │   ├── dependencies.py
│   │   └── main.py
│   ├── models/digit_classifier.pt   # trained CNN weights
│   ├── notebooks/                   # training notebook
│   ├── tests/                       # pytest suite
│   ├── training/                    # dataset parser, train/evaluate scripts
│   ├── uploads/                     # saved uploaded images
│   ├── Dockerfile
│   ├── requirements.txt
│   └── .env.example
└── Frontend/
    ├── src/
    │   ├── components/           # history, home, layout, model (pipeline graph), predictor
    │   ├── data/pipelineData.js  # pipeline nodes and edges
    │   ├── pages/                # Home, Predictor, Model, History, About, NotFound
    │   ├── services/api.js       # REST client
    │   └── styles/
    ├── package.json
    └── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.9+ (3.11 recommended)
- Node.js 18+ and npm

### 1. Backend

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv
# Windows (PowerShell):  .\venv\Scripts\Activate.ps1
# Windows (CMD):         venv\Scripts\activate.bat
# Linux / macOS:         source venv/bin/activate

pip install -r requirements.txt

# Optional: copy and edit environment settings
cp .env.example .env

# Start the API server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

- API base URL: `http://localhost:8000/api/v1`
- Swagger docs: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

Trained weights (`models/digit_classifier.pt`) and classical-model artifacts are already included, so training is optional.

### 2. Frontend

```bash
cd Frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

To point the frontend at a different backend, set `VITE_API_BASE_URL` (default: `http://localhost:8000/api/v1`).

### 3. (Optional) Retrain the models

The training scripts read the raw MNIST files from `archive/`.

```bash
cd backend

python training/train.py             # train the CNN → models/digit_classifier.pt
python training/train_classical.py   # train SVM / KNN / RF + digit templates
python training/evaluate.py          # confusion matrix & classification report
python training/generate_metrics.py  # regenerate metrics.json
```

---

## 📡 API Reference

Base path: `/api/v1`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Service status, model-loaded flag and compute device |
| `POST` | `/predict/canvas` | Predict from a Base64 canvas image (`{"image_data": "data:image/png;base64,..."}`) |
| `POST` | `/predict/image` | Predict from an uploaded image (`multipart/form-data`, field `file`) |
| `GET` | `/model/info` | Model metadata, accuracy and class labels |
| `POST` | `/model/reload` | Reload model weights from disk |
| `GET` | `/history` | Paginated prediction history (`skip`, `limit` ≤ 200, optional `digit` 0–9) |
| `DELETE` | `/history/clear` | Delete all history records |

### Example response — `POST /predict/canvas`

```json
{
  "predicted_digit": 7,
  "digit_name": "Seven",
  "confidence": 0.99,
  "confidence_scores": { "0": 0.0, "...": 0.0, "7": 0.99 },
  "probabilities": [{ "digit": 7, "name": "Seven", "confidence": 0.99 }],
  "algorithm_predictions": { "cnn": {}, "svm": {}, "knn": {}, "random_forest": {} },
  "handwriting_quality": { "quality_score": 91.5, "quality_level": "Excellent" },
  "image_similarity": { "overall_similarity_score": 0.82 },
  "record_id": 12,
  "created_at": "2026-11-12T10:30:00Z"
}
```

*(Values above are illustrative.)*

---

## ⚙️ Configuration

Set these in `backend/.env`:

| Variable | Default | Purpose |
| :--- | :--- | :--- |
| `PROJECT_NAME` | `Handwritten Digit Classifier API` | API title |
| `API_V1_STR` | `/api/v1` | API route prefix |
| `DATABASE_URL` | `sqlite:///./predictions.db` | History database |
| `LOG_LEVEL` | `INFO` | Logging verbosity |

---

## 🧪 Testing

```bash
cd backend
python -m pytest
```

Tests cover the health endpoint, preprocessing, model loading and prediction.

---

## 🐳 Docker (Backend)

```bash
cd backend
docker build -t handwritten-digit-backend .
docker run -p 10000:10000 handwritten-digit-backend
```

The container listens on `$PORT` (default `10000`), which suits platforms such as Render.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| Frontend | React 19, Vite, React Router, `@xyflow/react`, Lucide icons, CSS |
| Backend | FastAPI, Uvicorn, Pydantic v2, SQLAlchemy 2, SQLite |
| Machine learning | PyTorch, torchvision, scikit-learn, NumPy |
| Image processing | OpenCV (headless), Pillow |
| Testing / DevOps | Pytest, HTTPX, Docker |

---

## 🔮 Possible Improvements

- Data augmentation to better handle thick, rotated or off-centre handwriting
- Train the classical models on the full MNIST set
- User authentication and per-user history
- Restrict CORS origins for production (currently open to all)

---

## 📄 License

This is a minor academic project. Add a license of your choice (for example MIT) before distributing.

## 🙏 Acknowledgements

- [MNIST database](http://yann.lecun.com/exdb/mnist/) by Yann LeCun, Corinna Cortes and Christopher J.C. Burges
- PyTorch, FastAPI, scikit-learn, OpenCV and React open-source communities
