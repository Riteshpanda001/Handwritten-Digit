import React from 'react';
import { Cpu, ArrowDown } from 'lucide-react';

export default function ModelArchitecture() {
  const layers = [
    { title: 'Input Layer', desc: '1 x 28 x 28 normalized grayscale tensor' },
    { title: 'Conv Block 1', desc: 'Conv2d(1, 32, kernel=3) + BatchNorm2d(32) + ReLU + MaxPool2d(2, 2)' },
    { title: 'Conv Block 2', desc: 'Conv2d(32, 64, kernel=3) + BatchNorm2d(64) + ReLU + MaxPool2d(2, 2)' },
    { title: 'Dropout Regularization', desc: 'Dropout(p=0.25) to prevent overfitting' },
    { title: 'Fully Connected Dense Layer 1', desc: 'Linear(1600 -> 128) + ReLU + Dropout(p=0.5)' },
    { title: 'Output Classifier Layer', desc: 'Linear(128 -> 10) + Softmax probability distribution' }
  ];

  return (
    <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
      <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
        PyTorch CNN Architecture Pipeline
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
        {layers.map((layer, index) => (
          <React.Fragment key={index}>
            <div
              style={{
                width: '100%',
                maxWidth: '640px',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(15, 23, 42, 0.7)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontWeight: 600, color: 'var(--interactive-cyan)', fontSize: '0.95rem' }}>
                  {layer.title}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {layer.desc}
                </div>
              </div>
            </div>
            {index < layers.length - 1 && (
              <ArrowDown size={18} color="var(--interactive-cyan)" style={{ opacity: 0.6 }} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
