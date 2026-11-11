import React from 'react';
import './InputPreview.css';
import { Eye } from 'lucide-react';

export default function InputPreview({ imageSrc, mode = 'canvas' }) {
  return (
    <div className="input-preview-container">
      <div className="preview-thumb-box">
        {imageSrc ? (
          <img src={imageSrc} alt="Preprocessed Digit" className="preview-thumb-img" />
        ) : (
          <Eye size={16} color="var(--text-muted)" />
        )}
      </div>
      <div className="preview-details">
        <span className="preview-label">CNN Input Representation</span>
        <span className="preview-meta mono">
          {mode === 'canvas' ? '280x280 Canvas Stroke' : 'Uploaded File Image'}
        </span>
      </div>
    </div>
  );
}
