// Handwritten Digit ML Pipeline Node & Edge Graph Configuration

export const NODE_CATEGORIES = {
  input: { label: 'Input / Data', color: '#3B82F6', badgeBg: 'rgba(59, 130, 246, 0.15)' },
  preprocessing: { label: 'Preprocessing', color: '#22D3EE', badgeBg: 'rgba(34, 211, 238, 0.15)' },
  deep_learning: { label: 'Deep Learning', color: '#8B5CF6', badgeBg: 'rgba(139, 92, 246, 0.15)' },
  classical_ml: { label: 'Classical ML', color: '#A855F7', badgeBg: 'rgba(168, 85, 247, 0.15)' },
  analysis: { label: 'Analysis', color: '#34D399', badgeBg: 'rgba(52, 211, 153, 0.15)' },
  output: { label: 'Output / Storage', color: '#F97316', badgeBg: 'rgba(249, 115, 22, 0.15)' },
  infra: { label: 'Infrastructure', color: '#6366F1', badgeBg: 'rgba(99, 102, 241, 0.15)' }
};

export const INITIAL_NODES = [
  // --- COLUMN 1: INPUT ---
  {
    id: 'node-1',
    type: 'pipelineNode',
    position: { x: 50, y: 350 },
    data: {
      nodeId: 1,
      title: 'Input',
      badge: 'User Input',
      category: 'input',
      iconName: 'PenTool',
      description: 'Canvas drawing or uploaded handwritten digit',
      fields: [
        { label: 'Input Type', value: 'Canvas / Image Upload' },
        { label: 'Raw Format', value: 'PNG / JPEG / RGBA' },
        { label: 'Canvas Size', value: '280 × 280 px' }
      ],
      ports: {
        inputs: [],
        outputs: ['image_input']
      },
      infoPanel: {
        purpose: 'Capture freehand user drawing or file upload in real-time',
        technology: 'HTML5 Canvas API / FileReader',
        architecture: 'Interactive Pen Canvas & File Drag-and-Drop Handler',
        input: 'Raw user mouse/touch strokes or standard image files',
        output: 'Raw RGBA Image Matrix / DataURL',
        parameters: { 'Canvas Scale': '280x280', 'Stroke Width': '18px', 'Color': 'White on Black' }
      }
    }
  },

  // --- COLUMN 2: PREPROCESSING ---
  {
    id: 'node-2',
    type: 'pipelineNode',
    position: { x: 380, y: 350 },
    data: {
      nodeId: 2,
      title: 'Image Preprocessing',
      badge: 'OpenCV / PIL',
      category: 'preprocessing',
      iconName: 'Sliders',
      description: 'Convert user input into MNIST-compatible image',
      steps: [
        'Grayscale Conversion',
        'Noise Reduction',
        'Thresholding',
        'Digit Detection',
        'Bounding Box',
        'Crop & Center',
        'Resize & Pad'
      ],
      ports: {
        inputs: ['image_input'],
        outputs: ['processed_image']
      },
      infoPanel: {
        purpose: 'Transform unconstrained user inputs into centered, isolated, high-contrast digit sub-images',
        technology: 'OpenCV (cv2) & Pillow (PIL)',
        architecture: 'Multi-stage Image Processing Pipeline',
        input: 'Raw RGBA image matrix (280x280)',
        output: 'Cropped & centered 28x28 grayscale image array',
        parameters: {
          'Thresholding': 'Otsu Binarization',
          'Noise Filter': 'Gaussian Blur (kernel 3x3)',
          'Bounding Box': 'Contour Detection (cv2.findContours)',
          'Aspect Ratio': 'Preserved with padding'
        }
      }
    }
  },

  // --- COLUMN 3: NORMALIZATION ---
  {
    id: 'node-3',
    type: 'pipelineNode',
    position: { x: 710, y: 350 },
    data: {
      nodeId: 3,
      title: 'MNIST Normalization',
      badge: 'Tensor Formatter',
      category: 'preprocessing',
      iconName: 'Layers',
      description: 'Convert input to model-compatible tensor',
      fields: [
        { label: 'Input Dim', value: '28 × 28 px' },
        { label: 'Channels', value: '1 (Grayscale)' },
        { label: 'Pixel Range', value: '0.0 – 1.0 (Float32)' },
        { label: 'Tensor Shape', value: '[1, 1, 28, 28]' }
      ],
      ports: {
        inputs: ['processed_image'],
        outputs: ['normalized_tensor']
      },
      infoPanel: {
        purpose: 'Normalize pixel intensity scales and construct batch tensor representations for PyTorch and scikit-learn model inference',
        technology: 'NumPy & PyTorch TorchVision Transforms',
        architecture: 'Tensor Rescaling & Standard Normalization',
        input: '28x28 uint8 grayscale array [0..255]',
        output: 'Float32 normalized tensor [1, 1, 28, 28] & 784-dim flattened vector',
        parameters: {
          'Mean': '0.1307',
          'Std Dev': '0.3081',
          'Min/Max Scaling': 'x / 255.0',
          'Batch Size': '1'
        }
      }
    }
  },

  // --- COLUMN 4: PARALLEL MODELS ---
  {
    id: 'node-4',
    type: 'pipelineNode',
    position: { x: 1040, y: 50 },
    data: {
      nodeId: 4,
      title: 'PyTorch CNN',
      badge: 'Deep Learning',
      category: 'deep_learning',
      iconName: 'Cpu',
      description: 'Primary handwritten digit classifier',
      modelType: 'cnn',
      fields: [
        { label: 'Architecture', value: '2D CNN' },
        { label: 'Framework', value: 'PyTorch 2.x' },
        { label: 'Input Shape', value: '1 × 28 × 28' },
        { label: 'Classes', value: '10 (Digits 0–9)' },
        { label: 'Layers', value: 'Conv2D → BatchNorm → ReLU → MaxPool → Linear' }
      ],
      hasMiniNet: true,
      ports: {
        inputs: ['normalized_tensor'],
        outputs: ['cnn_prediction', 'cnn_probabilities', 'cnn_confidence']
      },
      infoPanel: {
        purpose: 'Perform deep feature extraction and spatial classification of digit images',
        technology: 'PyTorch 2D CNN (torch.nn.Module)',
        architecture: 'Conv2d(1,32,k3) -> BatchNorm2d -> ReLU -> Conv2d(32,64,k3) -> MaxPool2d(2) -> Dropout(0.25) -> Linear(9216,128) -> Linear(128,10)',
        input: '1 x 28 x 28 normalized image tensor',
        output: '10-class Softmax probability vector & class index',
        parameters: {
          'Optimizer': 'Adam (lr=0.001)',
          'Loss Function': 'CrossEntropyLoss',
          'Dropout Rate': '0.25 / 0.50',
          'Activation': 'ReLU + LogSoftmax'
        }
      }
    }
  },
  {
    id: 'node-5',
    type: 'pipelineNode',
    position: { x: 1040, y: 350 },
    data: {
      nodeId: 5,
      title: 'Support Vector Machine',
      badge: 'Classical ML',
      category: 'classical_ml',
      iconName: 'GitCommit',
      description: 'RBF-kernel classification baseline',
      modelType: 'svm',
      fields: [
        { label: 'Kernel', value: 'RBF (Radial Basis)' },
        { label: 'Regularization (C)', value: '5.0' },
        { label: 'Probability', value: 'Enabled (Platt Scaling)' },
        { label: 'Input Feature Vector', value: '784 Flattened Pixels' }
      ],
      ports: {
        inputs: ['normalized_tensor'],
        outputs: ['svm_prediction', 'svm_probabilities', 'svm_confidence']
      },
      infoPanel: {
        purpose: 'Non-linear decision boundary classification using Radial Basis Function kernel',
        technology: 'scikit-learn SVC (Support Vector Classifier)',
        architecture: 'SVM with RBF Kernel & Platt probability estimation',
        input: 'Flattened 784-element feature vector',
        output: 'Predicted digit class & 10-class calibrated probabilities',
        parameters: {
          'Kernel': 'rbf',
          'C Parameter': '5.0',
          'Gamma': 'scale (1 / (n_features * X.var()))',
          'Probability': 'True'
        }
      }
    }
  },
  {
    id: 'node-6',
    type: 'pipelineNode',
    position: { x: 1040, y: 620 },
    data: {
      nodeId: 6,
      title: 'K-Nearest Neighbors',
      badge: 'Classical ML',
      category: 'classical_ml',
      iconName: 'Network',
      description: 'Distance-based classification',
      modelType: 'knn',
      fields: [
        { label: 'Neighbors (K)', value: '3' },
        { label: 'Distance Metric', value: 'Euclidean / Distance Weights' },
        { label: 'Algorithm', value: 'Auto (KDTree / BallTree)' },
        { label: 'Input Features', value: '784 Flattened Pixels' }
      ],
      ports: {
        inputs: ['normalized_tensor'],
        outputs: ['knn_prediction', 'knn_probabilities', 'knn_confidence']
      },
      infoPanel: {
        purpose: 'Classify digit based on distance proximity to k nearest training samples in feature space',
        technology: 'scikit-learn KNeighborsClassifier',
        architecture: 'Instance-Based Learning (k=3, weighted distance)',
        input: 'Flattened 784-element feature vector',
        output: 'Majority class vote & neighborhood sample distribution',
        parameters: {
          'n_neighbors': '3',
          'weights': 'distance',
          'metric': 'minkowski (p=2)',
          'leaf_size': '30'
        }
      }
    }
  },
  {
    id: 'node-7',
    type: 'pipelineNode',
    position: { x: 1040, y: 890 },
    data: {
      nodeId: 7,
      title: 'Random Forest',
      badge: 'Classical ML',
      category: 'classical_ml',
      iconName: 'GitBranch',
      description: 'Tree ensemble classification baseline',
      modelType: 'rf',
      fields: [
        { label: 'Number of Trees', value: '100 Estimators' },
        { label: 'Max Tree Depth', value: '15 Levels' },
        { label: 'Criterion', value: 'Gini Impurity' },
        { label: 'Input Features', value: '784 Flattened Pixels' }
      ],
      ports: {
        inputs: ['normalized_tensor'],
        outputs: ['rf_prediction', 'rf_probabilities', 'rf_confidence']
      },
      infoPanel: {
        purpose: 'Ensemble decision tree voting over randomized sub-features',
        technology: 'scikit-learn RandomForestClassifier',
        architecture: 'Bagged Decision Tree Ensemble (100 Trees)',
        input: 'Flattened 784-element feature vector',
        output: 'Ensemble vote probabilities & predicted digit class',
        parameters: {
          'n_estimators': '100',
          'max_depth': '15',
          'min_samples_split': '2',
          'bootstrap': 'True'
        }
      }
    }
  },

  // --- COLUMN 5: PREDICTION ANALYSIS ---
  {
    id: 'node-8',
    type: 'pipelineNode',
    position: { x: 1420, y: 470 },
    data: {
      nodeId: 8,
      title: 'Prediction Analysis',
      badge: 'Aggregator',
      category: 'analysis',
      iconName: 'BarChart2',
      description: 'Collect and compare predictions from all models',
      fields: [
        { label: 'Evaluated Models', value: '4 Models (CNN, SVM, KNN, RF)' },
        { label: 'Target Output', value: '10 Discrete Classes (0–9)' },
        { label: 'Comparison Mode', value: 'Cross-Model Alignment' }
      ],
      ports: {
        inputs: ['cnn_result', 'svm_result', 'knn_result', 'rf_result'],
        outputs: ['model_results']
      },
      infoPanel: {
        purpose: 'Consolidate predictions, probability distributions, and confidence scores across all 4 classification models',
        technology: 'Backend Model Aggregator Engine',
        architecture: 'Multi-Model Result Normalizer & Cross-Model Comparator',
        input: 'Predictions and probabilities from PyTorch CNN, SVM, KNN, RF',
        output: 'Unified model comparisons matrix & consensus metrics',
        parameters: {
          'Models Tracked': '4',
          'Weighting Strategy': 'Uniform Model Evaluation',
          'Metrics Aggregated': 'Predictions, Confidence, Entropy'
        }
      }
    }
  },

  // --- COLUMN 6: CONSENSUS, CONFIDENCE & FINAL PREDICTION ---
  {
    id: 'node-9',
    type: 'pipelineNode',
    position: { x: 1770, y: 150 },
    data: {
      nodeId: 9,
      title: 'Model Consensus',
      badge: 'Evaluation',
      category: 'analysis',
      iconName: 'CheckCircle2',
      description: 'Measure agreement between classifiers',
      fields: [
        { label: 'Models Monitored', value: 'CNN, SVM, KNN, Random Forest' },
        { label: 'Consensus Metric', value: 'Agreement Ratio' },
        { label: 'Current State', value: '4 / 4 Models Agree (100%)' }
      ],
      ports: {
        inputs: ['model_results'],
        outputs: ['consensus_score']
      },
      infoPanel: {
        purpose: 'Quantify inter-model agreement to assess classification robustness and flag ambiguous samples',
        technology: 'backend/app/ml/quality_evaluator.py',
        architecture: 'Statistical Consensus Evaluator',
        input: 'Individual predicted class outputs from 4 models',
        output: 'Consensus agreement score [0.0 - 1.0] and agreement ratio',
        parameters: {
          'Formula': 'Agreed Models / Total Models',
          'High Confidence Threshold': '>= 0.75 (3+ models agree)',
          'Low Confidence Warning': '< 0.50 (Disagreement)'
        }
      }
    }
  },
  {
    id: 'node-10',
    type: 'pipelineNode',
    position: { x: 1770, y: 470 },
    data: {
      nodeId: 10,
      title: 'Confidence Analysis',
      badge: 'Evaluation',
      category: 'analysis',
      iconName: 'Activity',
      description: 'Analyze prediction confidence across models',
      fields: [
        { label: 'CNN Confidence', value: '99.4%' },
        { label: 'SVM Confidence', value: '97.2%' },
        { label: 'KNN Confidence', value: '95.8%' },
        { label: 'RF Confidence', value: '94.5%' },
        { label: 'Mean Confidence', value: '96.7%' }
      ],
      ports: {
        inputs: ['model_results'],
        outputs: ['mean_confidence']
      },
      infoPanel: {
        purpose: 'Compute cross-model mean confidence, variance, and prediction entropy',
        technology: 'Backend Statistical Analyzer',
        architecture: 'Confidence Variance & Average Estimator',
        input: 'Max softmax probabilities from PyTorch CNN & Platt/distance probs from classical models',
        output: 'Average confidence score and model reliability index',
        parameters: {
          'Aggregation': 'Arithmetic Mean + Standard Deviation',
          'Uncertainty Penalty': 'Applied when variance is high'
        }
      }
    }
  },
  {
    id: 'node-13',
    type: 'pipelineNode',
    position: { x: 1770, y: 790 },
    data: {
      nodeId: 13,
      title: 'Final Prediction',
      badge: 'Result',
      category: 'output',
      iconName: 'Award',
      description: 'Final handwritten digit recognition result',
      fields: [
        { label: 'Predicted Digit', value: 'Digit "7"' },
        { label: 'Primary Model', value: 'PyTorch CNN' },
        { label: 'Overall Confidence', value: '99.4%' },
        { label: 'Status', value: 'Validated & Verified' }
      ],
      ports: {
        inputs: ['model_results'],
        outputs: ['prediction_result']
      },
      infoPanel: {
        purpose: 'Select and finalize the ultimate digit classification outcome using PyTorch CNN as primary model',
        technology: 'backend/app/ml/predictor.py',
        architecture: 'Primary CNN Classifier with Ensemble Fallback Verification',
        input: 'Aggregated model predictions and confidence scores',
        output: 'Final digit label, class index, confidence, and metadata',
        parameters: {
          'Primary Selection': 'PyTorch 2D CNN',
          'Ensemble Validation': 'Cross-checked against SVM, KNN, RF'
        }
      }
    }
  },

  // --- COLUMN 7: SIMILARITY, QUALITY, PROBABILITIES & HISTORY ---
  {
    id: 'node-11',
    type: 'pipelineNode',
    position: { x: 2150, y: 100 },
    data: {
      nodeId: 11,
      title: 'Image Similarity',
      badge: 'Computer Vision',
      category: 'analysis',
      iconName: 'Image',
      description: 'Compare normalized input against digit templates',
      fields: [
        { label: 'Cosine Similarity', value: '0.942' },
        { label: 'Mean Squared Error', value: '0.031' },
        { label: 'Template Match', value: 'MNIST Digit 7 Template' },
        { label: 'Overall Match', value: '94.2%' }
      ],
      ports: {
        inputs: ['prediction_result', 'normalized_image'],
        outputs: ['similarity_score']
      },
      infoPanel: {
        purpose: 'Compare user stroke pattern against canonical MNIST reference templates using structural similarity',
        technology: 'backend/app/ml/similarity_engine.py',
        architecture: 'Cosine Similarity & Mean Squared Error (MSE) Engine',
        input: 'Normalized 28x28 input tensor & predicted class digit template',
        output: 'Similarity percentage score & structural distance metric',
        parameters: {
          'Metric 1': 'Cosine Similarity (vector dot product)',
          'Metric 2': 'MSE (Pixel-wise intensity difference)',
          'Reference Set': 'Averaged MNIST digit templates'
        }
      }
    }
  },
  {
    id: 'node-12',
    type: 'pipelineNode',
    position: { x: 2150, y: 380 },
    data: {
      nodeId: 12,
      title: 'Handwriting Quality',
      badge: 'Heuristic Analysis',
      category: 'analysis',
      iconName: 'Zap',
      description: 'Evaluate stroke clarity and classification alignment',
      fields: [
        { label: 'Model Consensus', value: '100% (4/4)' },
        { label: 'Stroke Quality', value: 'High Contrast' },
        { label: 'Template Similarity', value: '94.2%' },
        { label: 'Quality Level', value: 'Excellent' },
        { label: 'Feedback', value: 'Clear stroke curvature and proper centering' }
      ],
      isHeuristicBadge: true,
      ports: {
        inputs: ['prediction_result', 'similarity_score', 'consensus_score'],
        outputs: ['quality_score', 'quality_level']
      },
      infoPanel: {
        purpose: 'Rule-based heuristic evaluation of digit handwriting legibility, centering, and classifier alignment',
        technology: 'backend/app/ml/quality_evaluator.py (Heuristic Evaluator - Not a trained ML model)',
        architecture: 'Rule-Based Quality Assessment Algorithm',
        input: 'Consensus score, confidence, stroke thickness, and template similarity',
        output: 'Quality score (0-100), Level (Excellent/Good/Fair/Needs Improvement), and user feedback',
        parameters: {
          'Weights': 'Consensus 40%, Confidence 30%, Similarity 30%',
          'Grade Thresholds': '>=85: Excellent, >=70: Good, >=50: Fair, <50: Needs Improvement'
        }
      }
    }
  },
  {
    id: 'node-14',
    type: 'pipelineNode',
    position: { x: 2150, y: 660 },
    data: {
      nodeId: 14,
      title: 'Class Probabilities',
      badge: 'Distribution',
      category: 'output',
      iconName: 'PieChart',
      description: 'Probability distribution across digits 0–9',
      hasProbBars: true,
      probabilities: [
        { digit: 0, prob: 0.01 },
        { digit: 1, prob: 0.02 },
        { digit: 2, prob: 0.01 },
        { digit: 3, prob: 0.03 },
        { digit: 4, prob: 0.01 },
        { digit: 5, prob: 0.02 },
        { digit: 6, prob: 0.01 },
        { digit: 7, prob: 0.994, isTop: true },
        { digit: 8, prob: 0.01 },
        { digit: 9, prob: 0.02 }
      ],
      ports: {
        inputs: ['prediction_result'],
        outputs: ['probabilities']
      },
      infoPanel: {
        purpose: 'Display complete 10-class Softmax confidence breakdown across all digit classes',
        technology: 'PyTorch torch.softmax() / scikit-learn predict_proba()',
        architecture: 'Normalized Probability Vector Visualizer',
        input: 'Raw output logits from primary CNN model',
        output: 'Class confidence values for digits 0 through 9',
        parameters: {
          'Activation': 'Softmax (Sum = 1.0)',
          'Top Class': 'Digit 7 (99.4%)'
        }
      }
    }
  },
  {
    id: 'node-15',
    type: 'pipelineNode',
    position: { x: 2150, y: 950 },
    data: {
      nodeId: 15,
      title: 'Prediction History',
      badge: 'Storage Log',
      category: 'output',
      iconName: 'History',
      description: 'Store and retrieve authenticated prediction records',
      fields: [
        { label: 'User ID', value: 'Authenticated User' },
        { label: 'Predicted Digit', value: 'Digit 7' },
        { label: 'Confidence', value: '99.4%' },
        { label: 'Input Mode', value: 'Canvas / Image' },
        { label: 'Timestamp', value: '2026-08-28 11:30 UTC' }
      ],
      ports: {
        inputs: ['prediction_result'],
        outputs: ['history_record']
      },
      infoPanel: {
        purpose: 'Persist prediction history and quality metrics for user history tracking and analytics',
        technology: 'backend/app/services/history_service.py',
        architecture: 'Prediction Audit Trail Logger',
        input: 'Prediction outcome, user token, image metadata, and quality scores',
        output: 'Persisted database record entry',
        parameters: {
          'Auth Requirement': 'JWT Token (Bearer)',
          'Storage Target': 'SQLite Prediction Table'
        }
      }
    }
  },

  // --- INFRASTRUCTURE SERVICE NODES ---
  {
    id: 'infra-backend',
    type: 'pipelineNode',
    position: { x: 710, y: 50 },
    data: {
      nodeId: 16,
      title: 'FastAPI Backend Service',
      badge: 'API Gateway',
      category: 'infra',
      iconName: 'Server',
      description: 'REST API service handling requests and model inference',
      fields: [
        { label: 'Predict Canvas', value: 'POST /api/v1/predict/canvas' },
        { label: 'Predict Image', value: 'POST /api/v1/predict/image' },
        { label: 'Model Specs', value: 'GET /api/v1/model/info' },
        { label: 'Reload Weights', value: 'POST /api/v1/model/reload' }
      ],
      ports: {
        inputs: [],
        outputs: ['api_route']
      },
      infoPanel: {
        purpose: 'Expose high-performance RESTful API endpoints for digit classification, model reloading, and history retrieval',
        technology: 'FastAPI, Uvicorn, Python 3.11',
        architecture: 'Asynchronous ASGI Web Controller with PyTorch runtime backend',
        input: 'JSON / Base64 Canvas Payload / Multipart Form Data',
        output: 'Structured JSON Prediction & Model Specification response',
        parameters: {
          'Host': 'localhost:8000',
          'CORS': 'Enabled for Frontend Client',
          'Auth': 'JWT Authentication Middleware'
        }
      }
    }
  },
  {
    id: 'infra-sqlite',
    type: 'pipelineNode',
    position: { x: 2540, y: 950 },
    data: {
      nodeId: 17,
      title: 'SQLite Database',
      badge: 'Database',
      category: 'infra',
      iconName: 'Database',
      description: 'Relational database storing users and historical predictions',
      fields: [
        { label: 'Engine', value: 'SQLite / SQLAlchemy ORM' },
        { label: 'Tables', value: 'Users, Predictions, Models' },
        { label: 'Persistence', value: 'digits_app.db' }
      ],
      ports: {
        inputs: ['history_record'],
        outputs: []
      },
      infoPanel: {
        purpose: 'Persist application state, user accounts, and historical classification logs',
        technology: 'SQLite3 & SQLAlchemy ORM',
        architecture: 'ACID Relational Storage',
        input: 'Structured ORM Prediction Model instance',
        output: 'Persisted relational rows & analytics queries',
        parameters: {
          'Database File': 'backend/digits_app.db',
          'ORM Engine': 'SQLAlchemy 2.0'
        }
      }
    }
  }
];

export const INITIAL_EDGES = [
  // Input -> Preprocessing -> Normalization
  {
    id: 'e1-2',
    source: 'node-1',
    target: 'node-2',
    sourceHandle: 'image_input',
    targetHandle: 'image_input',
    animated: true,
    style: { stroke: '#3B82F6', strokeWidth: 2 },
    markerEnd: { type: 'arrowclosed', color: '#3B82F6' }
  },
  {
    id: 'e2-3',
    source: 'node-2',
    target: 'node-3',
    sourceHandle: 'processed_image',
    targetHandle: 'processed_image',
    animated: true,
    style: { stroke: '#22D3EE', strokeWidth: 2 },
    markerEnd: { type: 'arrowclosed', color: '#22D3EE' }
  },

  // Normalization -> Parallel ML Models (CNN, SVM, KNN, RF)
  {
    id: 'e3-4',
    source: 'node-3',
    target: 'node-4',
    sourceHandle: 'normalized_tensor',
    targetHandle: 'normalized_tensor',
    animated: true,
    style: { stroke: '#8B5CF6', strokeWidth: 2 },
    markerEnd: { type: 'arrowclosed', color: '#8B5CF6' }
  },
  {
    id: 'e3-5',
    source: 'node-3',
    target: 'node-5',
    sourceHandle: 'normalized_tensor',
    targetHandle: 'normalized_tensor',
    animated: true,
    style: { stroke: '#A855F7', strokeWidth: 2 },
    markerEnd: { type: 'arrowclosed', color: '#A855F7' }
  },
  {
    id: 'e3-6',
    source: 'node-3',
    target: 'node-6',
    sourceHandle: 'normalized_tensor',
    targetHandle: 'normalized_tensor',
    animated: true,
    style: { stroke: '#A855F7', strokeWidth: 2 },
    markerEnd: { type: 'arrowclosed', color: '#A855F7' }
  },
  {
    id: 'e3-7',
    source: 'node-3',
    target: 'node-7',
    sourceHandle: 'normalized_tensor',
    targetHandle: 'normalized_tensor',
    animated: true,
    style: { stroke: '#A855F7', strokeWidth: 2 },
    markerEnd: { type: 'arrowclosed', color: '#A855F7' }
  },

  // Parallel Models -> Prediction Analysis (Aggregator)
  {
    id: 'e4-8',
    source: 'node-4',
    target: 'node-8',
    sourceHandle: 'cnn_prediction',
    targetHandle: 'cnn_result',
    style: { stroke: '#8B5CF6', strokeWidth: 2 },
    markerEnd: { type: 'arrowclosed', color: '#8B5CF6' }
  },
  {
    id: 'e5-8',
    source: 'node-5',
    target: 'node-8',
    sourceHandle: 'svm_prediction',
    targetHandle: 'svm_result',
    style: { stroke: '#A855F7', strokeWidth: 2 },
    markerEnd: { type: 'arrowclosed', color: '#A855F7' }
  },
  {
    id: 'e6-8',
    source: 'node-6',
    target: 'node-8',
    sourceHandle: 'knn_prediction',
    targetHandle: 'knn_result',
    style: { stroke: '#A855F7', strokeWidth: 2 },
    markerEnd: { type: 'arrowclosed', color: '#A855F7' }
  },
  {
    id: 'e7-8',
    source: 'node-7',
    target: 'node-8',
    sourceHandle: 'rf_prediction',
    targetHandle: 'rf_result',
    style: { stroke: '#A855F7', strokeWidth: 2 },
    markerEnd: { type: 'arrowclosed', color: '#A855F7' }
  },

  // Prediction Analysis -> Consensus, Confidence, Final Prediction
  {
    id: 'e8-9',
    source: 'node-8',
    target: 'node-9',
    sourceHandle: 'model_results',
    targetHandle: 'model_results',
    style: { stroke: '#34D399', strokeWidth: 2 },
    markerEnd: { type: 'arrowclosed', color: '#34D399' }
  },
  {
    id: 'e8-10',
    source: 'node-8',
    target: 'node-10',
    sourceHandle: 'model_results',
    targetHandle: 'model_results',
    style: { stroke: '#34D399', strokeWidth: 2 },
    markerEnd: { type: 'arrowclosed', color: '#34D399' }
  },
  {
    id: 'e8-13',
    source: 'node-8',
    target: 'node-13',
    sourceHandle: 'model_results',
    targetHandle: 'model_results',
    animated: true,
    style: { stroke: '#F97316', strokeWidth: 2.5 },
    markerEnd: { type: 'arrowclosed', color: '#F97316' }
  },

  // Final Prediction -> Image Similarity, Quality, Class Probabilities, History
  {
    id: 'e13-11',
    source: 'node-13',
    target: 'node-11',
    sourceHandle: 'prediction_result',
    targetHandle: 'prediction_result',
    style: { stroke: '#34D399', strokeWidth: 2 },
    markerEnd: { type: 'arrowclosed', color: '#34D399' }
  },
  {
    id: 'e13-12',
    source: 'node-13',
    target: 'node-12',
    sourceHandle: 'prediction_result',
    targetHandle: 'prediction_result',
    style: { stroke: '#34D399', strokeWidth: 2 },
    markerEnd: { type: 'arrowclosed', color: '#34D399' }
  },
  {
    id: 'e13-14',
    source: 'node-13',
    target: 'node-14',
    sourceHandle: 'prediction_result',
    targetHandle: 'prediction_result',
    style: { stroke: '#F97316', strokeWidth: 2 },
    markerEnd: { type: 'arrowclosed', color: '#F97316' }
  },
  {
    id: 'e13-15',
    source: 'node-13',
    target: 'node-15',
    sourceHandle: 'prediction_result',
    targetHandle: 'prediction_result',
    style: { stroke: '#F97316', strokeWidth: 2 },
    markerEnd: { type: 'arrowclosed', color: '#F97316' }
  },

  // Prediction History -> SQLite Database
  {
    id: 'e15-17',
    source: 'node-15',
    target: 'infra-sqlite',
    sourceHandle: 'history_record',
    targetHandle: 'history_record',
    style: { stroke: '#6366F1', strokeWidth: 2, strokeDasharray: '5 5' },
    markerEnd: { type: 'arrowclosed', color: '#6366F1' }
  },

  // Infrastructure FastAPI -> Pipeline Connection
  {
    id: 'e-infra-pipeline',
    source: 'infra-backend',
    target: 'node-3',
    sourceHandle: 'api_route',
    targetHandle: 'processed_image',
    style: { stroke: '#6366F1', strokeWidth: 1.5, strokeDasharray: '4 4' },
    markerEnd: { type: 'arrowclosed', color: '#6366F1' }
  }
];
