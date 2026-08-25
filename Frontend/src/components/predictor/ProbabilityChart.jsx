import React from 'react';
import './ProbabilityChart.css';

export default function ProbabilityChart({ probabilities = Array(10).fill(0), topPredicted = null }) {
  return (
    <div className="probability-chart-container">
      <div className="chart-header">
        <span className="chart-title">Softmax Output Distribution</span>
        <span className="chart-badge mono">10-Class</span>
      </div>

      <div className="probs-list">
        {probabilities.map((prob, idx) => {
          const digit = typeof prob === 'object' && prob.digit !== undefined ? prob.digit : idx;
          const numProb = typeof prob === 'object' ? (prob.confidence ?? prob.value ?? 0) : Number(prob) || 0;
          const isWinner = String(topPredicted) === String(digit);

          return (
            <div key={digit} className={`prob-row ${isWinner ? 'is-winner' : ''}`}>
              <span className="digit-badge">{digit}</span>
              <div className="prob-track">
                <div
                  className="prob-fill"
                  style={{ width: `${Math.max(numProb, 2)}%` }}
                />
              </div>
              <span className="prob-value mono">{numProb}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

