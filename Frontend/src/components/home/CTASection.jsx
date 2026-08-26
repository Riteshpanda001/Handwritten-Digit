import React from 'react';
import './CTASection.css';
import { ArrowRight, Code2, Rocket } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="glass-card cta-card animate-glow">
          <h2 className="cta-title">
            Ready to Explore <span className="text-gradient">Handwritten Digit AI</span>?
          </h2>
          <p className="cta-desc">
            Test the live model interactive canvas, deploy with FastAPI, or inspect model training architecture.
          </p>

          <div className="cta-buttons">
            <a href="#demo" className="btn btn-primary">
              <Rocket size={18} /> Launch Live Demo
            </a>
            <a href="#tech-stack" className="btn btn-secondary">
              <Code2 size={18} /> View Pipeline
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
