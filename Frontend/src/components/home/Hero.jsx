import { Link, useNavigate } from 'react-router-dom';
import './Hero.css';
import { ArrowRight, Terminal } from 'lucide-react';
import logoPng from '../../assets/logo/handwritten-digit-logo.png';
import { useAuth } from '../../context/AuthContext';

export default function Hero() {
  const navigate = useNavigate();
  const { isAuthenticated, openAuthModal } = useAuth();

  const handleStartPredicting = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      openAuthModal('login');
    } else {
      navigate('/predictor');
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-bg-glow"></div>
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Real-Time <span className="text-gradient">Handwritten Digit</span> Recognition
          </h1>
          <p className="hero-description">
            An interactive AI-powered web application for real-time handwritten digit recognition. Draw directly on the canvas or upload an image to identify digits from 0–9 using a PyTorch CNN alongside SVM, KNN, and Random Forest models. Advanced OpenCV preprocessing prepares handwritten inputs for classification, while FastAPI delivers fast predictions, confidence scores, probability analysis, and prediction history.
          </p>

          <div className="hero-actions">
            <button onClick={handleStartPredicting} className="btn btn-primary">
              Start Predicting <ArrowRight size={18} />
            </button>
            <Link to="/model" className="btn btn-secondary">
              <Terminal size={18} /> View Architecture
            </Link>
          </div>

          <div className="hero-stats-grid">
            <div className="stat-item">
              <span className="stat-number text-gradient">99.2%</span>
              <span className="stat-label">Test Accuracy</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">&lt; 15ms</span>
              <span className="stat-label">Inference Latency</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">70,000+</span>
              <span className="stat-label">MNIST Samples</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="glass-card hero-card animate-float animate-glow">
            <img src={logoPng} alt="Handwritten Digit AI" className="logo-display" />
          </div>
        </div>
      </div>
    </section>
  );
}
