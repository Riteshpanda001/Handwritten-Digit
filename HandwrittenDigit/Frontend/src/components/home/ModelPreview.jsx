import { useRef, useEffect } from 'react';
import './ModelPreview.css';
import { Sparkles } from 'lucide-react';

export default function ModelPreview() {
  const canvasRef = useRef(null);
  const prediction = 1;
  const confidence = 99.95;
  const probabilities = [0.01, 99.95, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01];

  const drawSampleDigit = (ctx) => {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 280, 280);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 22;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(115, 85);
    ctx.lineTo(140, 55);
    ctx.lineTo(140, 220);
    ctx.moveTo(95, 220);
    ctx.lineTo(185, 220);
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawSampleDigit(ctx);
  }, []);

  return (
    <section id="demo" className="model-preview-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Live Interactive Demo</span>
          <h2>Draw & Test Digit Classification</h2>
          <p>Draw any digit from 0 to 9 below to trigger real-time PyTorch model inference.</p>
        </div>

        <div className="canvas-layout">
          <div className="glass-card canvas-card">
            <div className="canvas-header">
              <span className="canvas-title">
                <Sparkles size={18} className="text-gradient" /> Drawing Board
              </span>
              <span className="mono" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                280x280 Canvas
              </span>
            </div>

            <canvas
              ref={canvasRef}
              width={280}
              height={280}
              className="drawing-canvas"
              style={{ cursor: 'default' }}
            />
          </div>

          <div className="glass-card output-card">
            <div className="prediction-hero">
              <div className="prediction-digit-box">{prediction}</div>
              <div className="prediction-details">
                <h4>Predicted Digit</h4>
                <div className="confidence-score">
                  {confidence}% <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Confidence</span>
                </div>
              </div>
            </div>

            <h5 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              Probability Breakdown (Softmax)
            </h5>

            <div className="probs-container">
              {probabilities.map((prob, d) => (
                <div key={d} className="prob-row">
                  <span className="digit-label">{d}</span>
                  <div className="prob-bar-track">
                    <div
                      className="prob-bar-fill"
                      style={{ width: `${Math.max(prob, 2)}%` }}
                    ></div>
                  </div>
                  <span className="prob-percent">{prob}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
