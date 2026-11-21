import React from 'react';
import './ProbabilityChart.css';

export default function ProbabilityChart({ probabilities = Array(10).fill(0), topPredicted = null }) {
  // Normalize probabilities array in case it's an object or list
  const list = Array.isArray(probabilities)
    ? probabilities
    : (typeof probabilities === 'object' && probabilities !== null)
      ? Array.from({ length: 10 }, (_, d) => probabilities[d] || probabilities[String(d)] || 0)
      : Array(10).fill(0);

  return (
    <div className="probability-chart-container">
      <div className="chart-header">
        <span className="chart-title">Softmax Output Distribution</span>
        <span className="chart-badge mono">10-Class</span>
      </div>

      <div className="probs-list">
        {list.map((item, index) => {
          const digit = (typeof item === 'object' && item !== null && item.digit !== undefined)
            ? item.digit
            : index;

          const rawVal = (typeof item === 'object' && item !== null && item.confidence !== undefined)
            ? item.confidence
            : (typeof item === 'object' && item !== null && item.score !== undefined)
              ? item.score
              : item;

          let numProb = Number(rawVal) || 0;
          if (numProb > 0 && numProb <= 1.0) {
            numProb = +(numProb * 100).toFixed(1);
          } else {
            numProb = +numProb.toFixed(1);
          }

          const isWinner = topPredicted !== null &&
            topPredicted !== '?' &&
            topPredicted !== undefined &&
            (Number(topPredicted) === Number(digit));

          const fillWidth = numProb > 0 ? Math.min(Math.max(numProb, 2), 100) : 0;

          return (
            <div key={digit} className={`prob-row ${isWinner ? 'is-winner' : ''}`}>
              <span className="digit-badge">{digit}</span>
              <div className="prob-track">
                <div
                  className="prob-fill"
                  style={{ width: `${fillWidth}%` }}
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
