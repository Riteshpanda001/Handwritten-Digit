import React from 'react';
import './AlgorithmComparison.css';
import { Cpu, Layers, GitBranch, Share2 } from 'lucide-react';

export default function AlgorithmComparison({ algorithmPredictions }) {
  const preds = algorithmPredictions || {};

  const algorithms = [
    {
      key: 'cnn',
      title: 'PyTorch 2D CNN',
      badge: 'Deep Learning',
      icon: Cpu,
      data: preds.cnn || { predicted_digit: '?', confidence: 0, accuracy_score: 0.992 }
    },
    {
      key: 'svm',
      title: 'Support Vector Machine',
      badge: 'SVM (RBF)',
      icon: Layers,
      data: preds.svm || { predicted_digit: '?', confidence: 0, accuracy_score: 0.979 }
    },
    {
      key: 'random_forest',
      title: 'Random Forest',
      badge: 'Ensemble (100 Trees)',
      icon: GitBranch,
      data: preds.random_forest || { predicted_digit: '?', confidence: 0, accuracy_score: 0.969 }
    },
    {
      key: 'knn',
      title: 'k-Nearest Neighbors',
      badge: 'KNN (k=3)',
      icon: Share2,
      data: preds.knn || { predicted_digit: '?', confidence: 0, accuracy_score: 0.968 }
    }
  ];

  return (
    <div className="algo-comparison-container">
      <div className="algo-header">
        <h4 className="algo-title">Multi-Algorithm Predictions</h4>
        <span className="algo-subtitle">Simultaneous ML Ensemble Inference</span>
      </div>

      <div className="algo-grid">
        {algorithms.map((item) => {
          const IconComponent = item.icon;
          const predDigit = item.data.predicted_digit !== undefined ? item.data.predicted_digit : '?';
          const confPercent = item.data.confidence !== undefined ? (item.data.confidence * 100).toFixed(1) : '0.0';

          return (
            <div key={item.key} className="algo-card">
              <div className="algo-card-top">
                <div className="algo-icon-wrapper">
                  <IconComponent size={16} />
                </div>
                <div className="algo-card-info">
                  <span className="algo-name">{item.title}</span>
                  <span className="algo-badge">{item.badge}</span>
                </div>
              </div>

              <div className="algo-card-body">
                <div className="algo-pred-box">
                  <span className="algo-pred-label">Predicted</span>
                  <span className="algo-pred-digit">{predDigit}</span>
                </div>

                <div className="algo-stats-box">
                  <div className="algo-stat-row">
                    <span>Confidence:</span>
                    <strong className="algo-conf-val">{confPercent}%</strong>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
