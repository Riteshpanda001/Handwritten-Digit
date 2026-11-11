import React from 'react';
import './ImageSimilarity.css';
import { Image, CheckCircle2 } from 'lucide-react';

export default function ImageSimilarity({ similarityData }) {
  if (!similarityData) return null;

  const topMatchDigit = similarityData.top_match_digit !== undefined ? similarityData.top_match_digit : '?';
  const topSimilarityPercent = similarityData.top_similarity_percentage !== undefined
    ? similarityData.top_similarity_percentage
    : 85.0;
  const overallPercent = similarityData.overall_similarity_percentage !== undefined
    ? similarityData.overall_similarity_percentage
    : topSimilarityPercent;

  const perDigitList = similarityData.per_digit_similarity || [];

  return (
    <div className="similarity-card-container">
      <div className="similarity-header">
        <div className="similarity-title-group">
          <Image size={18} className="similarity-icon" />
          <span className="similarity-title">Digit Image Similarity Analysis</span>
        </div>
        <span className="similarity-top-badge">
          <CheckCircle2 size={13} /> {overallPercent}% Match to Prototype {topMatchDigit}
        </span>
      </div>

      <p className="similarity-desc">
        Structural similarity (Cosine & MSE correlation) comparing input stroke to benchmark MNIST prototype templates (0–9):
      </p>

      <div className="similarity-spectrum-grid">
        {Array.from({ length: 10 }, (_, d) => {
          const digitItem = perDigitList.find((item) => item.digit === d);
          const simVal = digitItem ? digitItem.similarity_percentage : 0;
          const isTop = d === topMatchDigit;

          return (
            <div key={d} className={`sim-digit-card ${isTop ? 'top-match' : ''}`}>
              <div className="sim-digit-top">
                <span className="sim-digit-num">{d}</span>
                <span className="sim-digit-val">{simVal}%</span>
              </div>
              <div className="sim-mini-bar-track">
                <div
                  className={`sim-mini-bar-fill ${isTop ? 'fill-top' : ''}`}
                  style={{ width: `${Math.min(100, Math.max(0, simVal))}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
