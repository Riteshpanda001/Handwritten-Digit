import React from 'react';
import './HowItWorks.css';
import { Edit3, Sliders, Cpu, Award } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: <Edit3 size={32} />,
    title: 'User Input',
    desc: 'Draw any digit (0-9) on the interactive HTML5 canvas element.'
  },
  {
    num: '02',
    icon: <Sliders size={32} />,
    title: 'Preprocessing',
    desc: 'Image is extracted, center-aligned, resized to 28x28 grayscale format.'
  },
  {
    num: '03',
    icon: <Cpu size={32} />,
    title: 'CNN Inference',
    desc: 'PyTorch model evaluates pixel arrays through convolutional layers.'
  },
  {
    num: '04',
    icon: <Award size={32} />,
    title: 'Output & Stats',
    desc: 'FastAPI returns top prediction, confidence score, and full distribution.'
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Pipeline Architecture</span>
          <h2>How The System Works</h2>
          <p>
            From raw canvas pixel strokes to neural network classification in four seamless steps.
          </p>
        </div>

        <div className="how-it-works-grid">
          {steps.map((s, idx) => (
            <div key={idx} className="glass-card step-card">
              <span className="step-number">{s.num}</span>
              <div className="step-icon">{s.icon}</div>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
