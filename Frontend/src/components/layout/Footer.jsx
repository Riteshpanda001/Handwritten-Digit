import React from 'react';
import './Footer.css';
import logoIcon from '../../assets/logo/handwritten-digit-icon.svg';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#" className="footer-logo">
              <img src={logoIcon} alt="Handwritten Digit Logo" className="footer-logo-img" />
              <span className="footer-brand-title">
                Handwritten <span className="text-gradient">Digit</span>
              </span>
            </a>
            <p className="footer-brand-desc">
              A high-precision deep learning vision application for real-time digit recognition powered by PyTorch, FastAPI, and HTML5 canvas graphics.
            </p>
          </div>

          <div>
            <h4 className="footer-heading">Platform</h4>
            <ul className="footer-links">
              <li><a href="#demo" className="footer-link">Interactive Predictor</a></li>
              <li><a href="#how-it-works" className="footer-link">CNN Architecture</a></li>
              <li><a href="#features" className="footer-link">Capabilities</a></li>
              <li><a href="#tech-stack" className="footer-link">Tech Ecosystem</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Machine Learning</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">MNIST Benchmark</a></li>
              <li><a href="#" className="footer-link">PyTorch 2.0 Engine</a></li>
              <li><a href="#" className="footer-link">OpenCV Preprocessing</a></li>
              <li><a href="#" className="footer-link">SQLite Persistence</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links">
              <li><a href="http://localhost:8000/docs" target="_blank" rel="noreferrer" className="footer-link">FastAPI Swagger Docs</a></li>
              <li><a href="#" className="footer-link">GitHub Repository</a></li>
              <li><a href="#" className="footer-link">Docker Deployment</a></li>
              <li><a href="#" className="footer-link">Model Checkpoints</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Handwritten Digit AI. All rights reserved.</span>
          <span className="mono">PyTorch CNN • FastAPI REST • React 19</span>
        </div>
      </div>
    </footer>
  );
}
