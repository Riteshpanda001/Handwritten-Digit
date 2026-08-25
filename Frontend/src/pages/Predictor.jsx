import React, { useRef, useState, useEffect } from 'react';
import './Predictor.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Predictor Sub-Components
import DigitCanvas from '../components/predictor/DigitCanvas';
import DrawingToolbar from '../components/predictor/DrawingToolbar';
import ImageUploader from '../components/predictor/ImageUploader';
import InputPreview from '../components/predictor/InputPreview';
import PredictButton from '../components/predictor/PredictButton';
import PredictionResult from '../components/predictor/PredictionResult';
import ConfidenceBar from '../components/predictor/ConfidenceBar';
import ProbabilityChart from '../components/predictor/ProbabilityChart';
import PredictionActions from '../components/predictor/PredictionActions';

import { predictCanvas, predictImage } from '../services/predictionApi';
import { getModelInfo } from '../services/modelApi';

import { Edit3, Upload, Sparkles, Activity, CheckCircle2, AlertCircle, AlertTriangle } from 'lucide-react';

export default function Predictor() {
  const canvasRef = useRef(null);
  const [mode, setMode] = useState('canvas'); // 'canvas' | 'upload'
  const [brushSize, setBrushSize] = useState(22);
  const [isEraser, setIsEraser] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState('?');
  const [confidence, setConfidence] = useState(0);
  const [probabilities, setProbabilities] = useState(
    Array.from({ length: 10 }, (_, d) => ({ digit: d, confidence: 0 }))
  );
  const [apiOnline, setApiOnline] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [inputPreviewData, setInputPreviewData] = useState(null);

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      await getModelInfo();
      setApiOnline(true);
    } catch (e) {
      setApiOnline(false);
    }
  };

  const handleClear = () => {
    if (mode === 'canvas') {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
    setUploadedImage(null);
    setUploadedFile(null);
    setInputPreviewData(null);
    setErrorMsg('');
    setPrediction('?');
    setConfidence(0);
    setProbabilities(Array.from({ length: 10 }, (_, d) => ({ digit: d, confidence: 0 })));
  };

  const handleImageUploaded = (dataUrl, fileObj) => {
    setUploadedImage(dataUrl);
    setUploadedFile(fileObj);
    setInputPreviewData(dataUrl);
    setErrorMsg('');
  };

  const runClassification = async () => {
    setIsLoading(false);
    setErrorMsg('');

    try {
      let result;
      if (mode === 'canvas') {
        const canvas = canvasRef.current;
        if (!canvas) {
          setErrorMsg('Canvas is not available.');
          return;
        }
        const dataUrl = canvas.toDataURL('image/png');
        setInputPreviewData(dataUrl);
        setIsLoading(true);
        result = await predictCanvas(dataUrl);
      } else {
        if (!uploadedFile && !uploadedImage) {
          setErrorMsg('Please upload a valid digit image file.');
          return;
        }
        setIsLoading(true);
        if (uploadedFile) {
          result = await predictImage(uploadedFile);
        } else {
          result = await predictCanvas(uploadedImage);
        }
      }

      setPrediction(result.digit);
      setConfidence(result.confidence);
      setProbabilities(result.probabilities);
      setApiOnline(true);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setApiOnline(false);
      setPrediction('?');
      setConfidence(0);
      setProbabilities(Array.from({ length: 10 }, (_, d) => ({ digit: d, confidence: 0 })));
      setErrorMsg(err.message || 'Prediction failed. Please try again.');
    }
  };

  return (
    <div className="predictor-page">
      <Navbar />

      <main className="predictor-main">
        <div className="container">
          <div className="predictor-header">
            <div className="predictor-badge">
              <Sparkles size={15} /> Real-Time Neural Net Predictor
            </div>
            <h1 className="predictor-title">Handwritten Digit Classification</h1>
            <p className="predictor-description">
              Draw any digit on the interactive canvas or upload a digit image to perform real-time PyTorch CNN inference and softmax confidence probability analysis.
            </p>
          </div>

          <div className="mode-tabs">
            <button
              className={`mode-tab-btn ${mode === 'canvas' ? 'active' : ''}`}
              onClick={() => {
                setMode('canvas');
                setErrorMsg('');
              }}
            >
              <Edit3 size={16} /> Drawing Canvas Mode
            </button>
            <button
              className={`mode-tab-btn ${mode === 'upload' ? 'active' : ''}`}
              onClick={() => {
                setMode('upload');
                setErrorMsg('');
              }}
            >
              <Upload size={16} /> Image File Upload Mode
            </button>
          </div>

          {errorMsg && (
            <div
              className="error-banner"
              style={{
                maxWidth: '800px',
                margin: '0 auto 2rem',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#ef4444',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontWeight: 500
              }}
            >
              <AlertTriangle size={20} />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="predictor-grid">
            {/* Left Box: Drawing Canvas or File Uploader */}
            <div className="glass-card predictor-card">
              <div className="card-header-bar">
                <span className="card-header-title">
                  <Activity size={18} className="text-gradient" />
                  {mode === 'canvas' ? 'Interactive Drawing Board' : 'Upload Digit File'}
                </span>
                <span className={`api-status-pill ${apiOnline ? 'online' : 'offline'}`}>
                  {apiOnline ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                  {apiOnline ? 'API Connected' : 'Server Disconnected'}
                </span>
              </div>

              {mode === 'canvas' ? (
                <>
                  <DigitCanvas
                    canvasRef={canvasRef}
                    brushSize={brushSize}
                    isEraser={isEraser}
                    onCanvasChange={() => {
                      if (canvasRef.current) {
                        setInputPreviewData(canvasRef.current.toDataURL());
                        runClassification();
                      }
                    }}
                  />
                  <DrawingToolbar
                    brushSize={brushSize}
                    setBrushSize={setBrushSize}
                    isEraser={isEraser}
                    setIsEraser={setIsEraser}
                    onClear={handleClear}
                  />
                </>
              ) : (
                <ImageUploader
                  onImageSelected={handleImageUploaded}
                  uploadedImage={uploadedImage}
                  onClear={handleClear}
                />
              )}

              <InputPreview imageSrc={inputPreviewData} mode={mode} />

              <PredictButton
                onClick={runClassification}
                isLoading={isLoading}
                disabled={mode === 'upload' && !uploadedImage}
              />
            </div>

            {/* Right Box: Prediction Result & Softmax Breakdown */}
            <div className="glass-card predictor-card">
              <div className="card-header-bar">
                <span className="card-header-title">Inference Output & Analytics</span>
              </div>

              <PredictionResult prediction={prediction} confidence={confidence} />

              <ConfidenceBar confidence={confidence} />

              <ProbabilityChart probabilities={probabilities} topPredicted={prediction} />

              <PredictionActions
                prediction={prediction}
                confidence={confidence}
                onReset={handleClear}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
