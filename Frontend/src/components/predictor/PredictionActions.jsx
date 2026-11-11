import React, { useState } from 'react';
import './PredictionActions.css';
import { Copy, Save, RotateCcw, Check } from 'lucide-react';

export default function PredictionActions({ prediction, confidence, onReset }) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const hasResult = prediction !== '?' && prediction !== null && prediction !== undefined;

  const handleCopy = () => {
    if (!hasResult) return;
    const text = `Digit Prediction: ${prediction} (${confidence}% confidence)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!hasResult) return;
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="prediction-actions-container">
      <button
        className="action-btn"
        onClick={handleCopy}
        disabled={!hasResult}
        title="Copy result text"
      >
        {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
        {copied ? 'Copied!' : 'Copy Result'}
      </button>

      <button
        className="action-btn"
        onClick={handleSave}
        disabled={!hasResult}
        title="Save result to local history"
      >
        {saved ? <Check size={14} color="#10b981" /> : <Save size={14} />}
        {saved ? 'Saved!' : 'Save Result'}
      </button>

      <button className="action-btn" onClick={onReset} title="Reset all state">
        <RotateCcw size={14} /> Reset
      </button>
    </div>
  );
}
