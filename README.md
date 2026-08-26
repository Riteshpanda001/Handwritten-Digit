✍️ Handwritten Digit Classification

An end-to-end full-stack AI and computer vision application that recognizes handwritten digits from 0 to 9 using a PyTorch Convolutional Neural Network (CNN).

The application allows users to either draw a handwritten digit on an interactive canvas or upload an image, sends the input through a FastAPI backend, preprocesses it, performs inference using a trained PyTorch model, and displays the predicted digit together with its confidence and class probabilities.

🌟 Project Overview

Handwritten Digit Classification combines machine learning with modern web development to create a complete AI application.

Core workflow

User
 │
 ├── Draw a Digit
 │
 └── Upload an Image
        │
        ▼
 React Frontend
        │
        ▼
 FastAPI REST API
        │
        ▼
 Image Preprocessing
        │
        ▼
 PyTorch CNN
        │
        ▼
 Prediction
        │
        ├── Predicted Digit
        ├── Confidence
        └── 10-Class Probabilities
        │
        ▼
 React Prediction Dashboard
        │
        ▼
 Prediction History

🚀 Features

✍️ Interactive Digit Canvas — draw digits directly in the browser.

📤 Image Upload — upload handwritten digit images.

🧠 CNN-Based Classification — classify digits using a trained PyTorch model.

🎯 Confidence Score — display model confidence for the predicted digit.

📊 Probability Distribution — visualize probabilities for all 10 digit classes.

🖼️ Image Preprocessing — grayscale conversion, thresholding, cropping, resizing, centering, and normalization.

📈 Model Information — view model architecture and evaluation information.

📜 Prediction History — save and review previous predictions.

🔐 Authentication — user registration, login, logout, and protected user data.

📱 Responsive UI — optimized for desktop, tablet, and mobile.

🌌 Midnight Vision UI — dark, modern AI-focused interface.

🧪 Backend Testing — tests for health, prediction, preprocessing, model, authentication, and related services.

🐳 Docker Support — backend containerization support.

🧠 Machine Learning

Dataset

The project uses the MNIST handwritten digit dataset.

MNIST contains grayscale images of handwritten digits from:

0 → 9

Each image is represented as:

28 × 28 pixels

with one grayscale channel.

Input shape

1 × 1 × 28 × 28

where:

1 = batch size

1 = grayscale channel

28 × 28 = image dimensions

🔬 Image Preprocessing Pipeline

User input cannot always be sent directly to the trained model. The application therefore normalizes the input into a format compatible with the MNIST-trained CNN.

Input Image
     │
     ▼
Image Decoding
     │
     ▼
Grayscale Conversion
     │
     ▼
Thresholding
     │
     ▼
Digit Detection
     │
     ▼
Bounding Box
     │
     ▼
Crop Digit
     │
     ▼
Resize
     │
     ▼
Center / Pad
     │
     ▼
28 × 28
     │
     ▼
Normalization
     │
     ▼
PyTorch Tensor
     │
     ▼
CNN Inference

The preprocessing implementation is located under:

backend/app/preprocessing/

🧬 CNN Architecture

The application uses a custom PyTorch CNN for digit classification.

The high-level architecture is:

Input
28 × 28 × 1
     │
     ▼
Convolutional Block
     │
     ├── Conv2D
     ├── BatchNorm2D
     ├── ReLU
     └── MaxPool2D
     │
     ▼
Convolutional Block
     │
     ├── Conv2D
     ├── BatchNorm2D
     ├── ReLU
     └── MaxPool2D
     │
     ▼
Flatten
     │
     ▼
Fully Connected Layer
     │
     ▼
Dropout
     │
     ▼
Output Layer
     │
     ▼
10 Digit Classes

The trained model is stored at:

backend/models/digit_classifier.pt

The model is loaded once by the backend model service and reused for inference.

📊 Model Performance

The project stores model evaluation information in:

backend/app/ml/artifacts/metrics.json

The current stored evaluation reports:

Metric

Value

Model

DigitClassifierCNN

Framework

PyTorch

Dataset

MNIST

Test Samples

10,000

Input Size

28 × 28

Classes

10

Accuracy

99.2%

Loss

0.028

These values are the stored evaluation results associated with the current project artifact. They should be regenerated after retraining the model.

📈 Model Evaluation

The project supports model analysis through:

Accuracy

Loss

Confusion Matrix

Class probabilities

Prediction confidence

Model metadata

Evaluation artifacts are stored under:

backend/app/ml/artifacts/

🏗️ Application Architecture

┌─────────────────────────────────────────────────────┐
│                  React Frontend                     │
│                                                     │
│ Home │ Predictor │ Model │ History │ About          │
│                                                     │
│ Canvas / Upload / Results / Charts / Authentication │
└──────────────────────┬──────────────────────────────┘
                       │
                       │ REST API
                       ▼
┌─────────────────────────────────────────────────────┐
│                    FastAPI                          │
│                                                     │
│ Authentication │ Prediction │ Model │ History      │
└───────────┬───────────────────────┬─────────────────┘
            │                       │
            ▼                       ▼
┌──────────────────────┐   ┌─────────────────────────┐
│ Image Preprocessing  │   │ SQLAlchemy + SQLite     │
│                      │   │                         │
│ OpenCV / Pillow      │   │ Users + Predictions     │
└──────────┬───────────┘   └─────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────┐
│                  PyTorch CNN                        │
│                                                     │
│ digit_classifier.pt                                 │
└─────────────────────────────────────────────────────┘

🎨 Frontend

The frontend is built using:

React

Vite

JavaScript / JSX

React Router

CSS

Lucide React

Application Pages

/

Home

Project introduction, features, workflow, technology stack, model preview, and CTA.

/predictor

Predictor

Draw or upload a digit and receive an AI prediction.

/model

Model

Model architecture, metrics, evaluation information, and ML explanation.

/history

History

View previous predictions associated with the authenticated user.

/about

About

Project explanation, technology information, and educational context.

/*

Not Found

Fallback page for unknown routes.

🎨 Midnight Vision Design System

The project uses a dark AI/technology visual style.

Role

Color

Hex

Main Background

Midnight

#070B14

Cards / Panels

Dark Navy

#0F172A

Primary

Electric Blue

#3B82F6

Interactive

Bright Cyan

#22D3EE

AI Highlight

Violet

#8B5CF6

Main Text

White

#F8FAFC

Secondary Text

Slate

#94A3B8

Borders

Blue Gray

#1E293B

Success / Confidence

Emerald

#34D399

Error

Soft Red

#EF4444

The design goal is:

Futuristic → AI → Premium → Clean → Interactive

🔮 Predictor Workflow

Drawing

Draw Digit
    │
    ▼
Canvas Image
    │
    ▼
POST /api/v1/predict/canvas
    │
    ▼
Preprocessing
    │
    ▼
PyTorch CNN
    │
    ▼
Prediction

Upload

Upload Image
    │
    ▼
Image Validation
    │
    ▼
POST /api/v1/predict/image
    │
    ▼
Preprocessing
    │
    ▼
PyTorch CNN
    │
    ▼
Prediction

The result includes:

Predicted Digit
Confidence
Probability Distribution

📡 API Reference

The backend uses the versioned API prefix:

/api/v1

Health

GET /api/v1/health

Checks backend and model readiness.

Canvas Prediction

POST /api/v1/predict/canvas

Accepts canvas image data.

Example:

{
  "image_data": "data:image/png;base64,..."
}

Image Prediction

POST /api/v1/predict/image

Accepts an uploaded image using multipart form data.

Model Information

GET /api/v1/model/info

Returns model metadata, architecture information, evaluation metrics, labels, and model status.

Reload Model

POST /api/v1/model/reload

Reloads the trained model weights.

Prediction History

GET /api/v1/history

Supports pagination and filtering where configured.

Example:

/api/v1/history?skip=0&limit=50

Clear History

DELETE /api/v1/history/clear

Clears prediction history for the authenticated user.

Authentication

POST /api/v1/auth/register
POST /api/v1/auth/login
GET  /api/v1/auth/me

Authentication is used to protect user-specific prediction history.

🔐 Authentication

The application supports:

User registration

Login

Logout

Current-user retrieval

Protected history

Password hashing

JWT-based authentication

The conceptual relationship is:

User
 │
 └── PredictionRecord
       ├── user_id
       ├── predicted_digit
       ├── confidence
       ├── probabilities
       ├── input_type
       └── created_at

Users should only be able to access their own prediction history.

🗄️ Database

The project uses:

SQLite
+
SQLAlchemy

Main entities:

User

id
full_name
email
hashed_password
created_at

PredictionRecord

id
user_id
input_type
predicted_digit
confidence
confidence_scores
image_filename
created_at

📁 Project Structure

HandwrittenDigit/
│
├── archive/
│   ├── train-images.idx3-ubyte
│   ├── train-labels.idx1-ubyte
│   ├── t10k-images.idx3-ubyte
│   └── t10k-labels.idx1-ubyte
│
├── backend/
│   │
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/
│   │   │       ├── auth_routes.py
│   │   │       ├── health_routes.py
│   │   │       ├── history_routes.py
│   │   │       ├── model_routes.py
│   │   │       └── prediction_routes.py
│   │   │
│   │   ├── database/
│   │   ├── ml/
│   │   │   └── artifacts/
│   │   ├── preprocessing/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── config.py
│   │   ├── dependencies.py
│   │   └── main.py
│   │
│   ├── models/
│   │   └── digit_classifier.pt
│   │
│   ├── training/
│   │   ├── dataset.py
│   │   ├── train.py
│   │   ├── evaluate.py
│   │   └── generate_metrics.py
│   │
│   ├── tests/
│   ├── notebooks/
│   ├── uploads/
│   ├── requirements.txt
│   ├── Dockerfile
│   └── README.md
│
├── Frontend/
│   │
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── history/
│   │   │   ├── home/
│   │   │   ├── layout/
│   │   │   ├── model/
│   │   │   └── predictor/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
└── README.md

⚙️ Installation

Prerequisites

Install:

Python 3.9+

Node.js 18+

npm

Git

🐍 Backend Setup

Open a terminal:

cd backend

Create a virtual environment.

Windows

python -m venv venv
venv\Scripts\activate

Linux / macOS

python3 -m venv venv
source venv/bin/activate

Install dependencies:

pip install -r requirements.txt

Generate evaluation metrics if required:

python training/generate_metrics.py

Start FastAPI:

uvicorn app.main:app --reload --host 127.0.0.1 --port 8000

Backend:

http://localhost:8000

Swagger:

http://localhost:8000/docs

ReDoc:

http://localhost:8000/redoc

⚛️ Frontend Setup

Open a second terminal:

cd Frontend

Install dependencies:

npm install

Create:

Frontend/.env

Example:

VITE_API_BASE_URL=http://localhost:8000/api/v1

Start the development server:

npm run dev

Frontend:

http://localhost:5173

🔧 Environment Variables

Backend

Create:

backend/.env

Example:

PROJECT_NAME=Handwritten Digit Classifier API
API_V1_STR=/api/v1
DATABASE_URL=sqlite:///./predictions.db

SECRET_KEY=replace_with_a_secure_random_secret
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

CORS_ORIGINS=http://localhost:5173

Use a strong randomly generated SECRET_KEY for any deployment.

Do not commit .env files containing secrets.

🧪 Testing

Backend tests are located under:

backend/tests/

Run:

cd backend
pytest

The test suite covers areas such as:

Health

Prediction

Image preprocessing

Model

Authentication

History

Always run the current test suite before claiming that all tests pass.

🐳 Docker

The backend includes Docker support.

Build:

cd backend
docker build -t handwritten-digit-backend .

Run:

docker run -p 8000:8000 handwritten-digit-backend

For production, configure environment variables and CORS appropriately.

🏋️ Training the Model

Training scripts are located in:

backend/training/

Important files:

dataset.py
train.py
evaluate.py
generate_metrics.py

Train:

cd backend
python training/train.py

Evaluate:

python training/evaluate.py

Generate evaluation artifacts:

python training/generate_metrics.py

The trained model is stored as:

backend/models/digit_classifier.pt

🔄 Complete Application Workflow

                  ┌───────────────┐
                  │     User      │
                  └───────┬───────┘
                          │
             ┌────────────┴────────────┐
             │                         │
             ▼                         ▼
       Draw Digit                Upload Image
             │                         │
             └────────────┬────────────┘
                          ▼
                   React Frontend
                          │
                          ▼
                    FastAPI API
                          │
                          ▼
                Image Preprocessing
                          │
                          ▼
                    PyTorch CNN
                          │
                          ▼
                 Prediction Result
                          │
             ┌────────────┼────────────┐
             ▼            ▼            ▼
          Digit       Confidence   Probabilities
             │            │            │
             └────────────┴────────────┘
                          ▼
                     React UI
                          │
                          ▼
                  Prediction History

🛡️ Security Considerations

Before production deployment:

Use a strong random secret key.

Restrict CORS to trusted domains.

Use HTTPS.

Never commit .env.

Validate uploaded files.

Apply upload size limits.

Protect user-specific history.

Avoid exposing internal server errors.

Use secure password hashing.

Configure production database credentials securely.

🚀 Future Improvements

Possible improvements include:

Real-time prediction while drawing

Data augmentation

Improved CNN architecture

Model versioning

Prediction analytics

PostgreSQL for production

Cloud deployment

CI/CD

Docker Compose

Automated model retraining

Model monitoring

Frontend unit/component tests

Better prediction explanations

Multi-digit handwritten number recognition

🎯 Learning Objectives

This project demonstrates practical knowledge of:

Machine Learning

CNN

MNIST

Image classification

Model training

Model evaluation

Softmax probabilities

Confusion matrix

Computer Vision

OpenCV

Grayscale conversion

Thresholding

Bounding boxes

Cropping

Resizing

Image normalization

Backend

FastAPI

REST APIs

Pydantic

SQLAlchemy

SQLite

JWT authentication

API validation

Frontend

React

React Router

Component architecture

Hooks

Canvas API

File upload

API integration

Responsive CSS

Software Engineering

Full-stack architecture

Authentication

Database design

Testing

Environment configuration

Docker

Git/GitHub

📌 Project Status

The project is designed as a complete full-stack AI application consisting of:

React
   +
FastAPI
   +
PyTorch CNN
   +
MNIST
   +
OpenCV
   +
SQLAlchemy / SQLite
   +
JWT Authentication
   +
Prediction History

The main goal is to demonstrate how a trained machine-learning model can be integrated into a real web application and exposed through a usable frontend.

👨‍💻 Author

Ritesh Kumar Panda

GitHub:

https://github.com/Riteshpanda001

Repository:

https://github.com/Riteshpanda001/Handwritten-Digit

📄 License

This project is currently intended for educational and portfolio purposes.

If you want to distribute the project as open source, add an appropriate license such as the MIT License.
