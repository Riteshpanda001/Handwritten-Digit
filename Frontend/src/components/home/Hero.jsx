import { Link } from 'react-router-dom';
import './Hero.css';
import { ArrowRight, Terminal } from 'lucide-react';
import logoPng from '../../assets/logo/handwritten-digit-logo.png';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-bg-glow"></div>
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Real-Time <span className="text-gradient">Handwritten Digit</span> Recognition
          </h1>
          <p className="hero-description">
            An interactive deep learning web application for real-time handwritten digit recognition. Draw directly on the interactive canvas or upload image files to analyze digits powered by a PyTorch CNN model, OpenCV image normalization, and a high-performance FastAPI backend.
          </p>

          <div className="hero-actions">
            <Link to="/predictor" className="btn btn-primary">
              Try Canvas Demo <ArrowRight size={18} />
            </Link>
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
