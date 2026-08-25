import React from 'react';
import './PredictButton.css';
import { Play, Loader2, Sparkles } from 'lucide-react';

export default function PredictButton({ onClick, isLoading = false, disabled = false }) {
  return (
    <div className="predict-button-wrapper">
      <button
        className="predict-cta-btn"
        onClick={onClick}
        disabled={disabled || isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="spinner-icon" /> Analyzing Digit...
          </>
        ) : (
          <>
            <Sparkles size={18} /> Classify Digit
          </>
        )}
      </button>
    </div>
  );
}
