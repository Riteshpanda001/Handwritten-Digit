import React from 'react';
import './HandwritingQuality.css';
import { Award, CheckCircle, Info } from 'lucide-react';

export default function HandwritingQuality({ qualityData }) {
  if (!qualityData) return null;

  const score = qualityData.quality_score !== undefined ? qualityData.quality_score : 0;
  const level = qualityData.quality_level || 'Good';
  const feedback = qualityData.feedback || 'Digit stroke analyzed.';
  const consensusRatio = qualityData.algorithm_consensus_ratio !== undefined
    ? Math.round(qualityData.algorithm_consensus_ratio * 100)
    : 100;
  const consensusCount = qualityData.consensus_count || 4;
  const totalAlgorithms = qualityData.total_algorithms || 4;

  let badgeColorClass = 'level-excellent';
  if (score < 55) badgeColorClass = 'level-poor';
  else if (score < 74) badgeColorClass = 'level-fair';
  else if (score < 88) badgeColorClass = 'level-good';

  return (
    <div className="quality-card-container">
      <div className="quality-header">
        <div className="quality-header-title">
          <Award size={18} className="quality-icon" />
          <span>Handwriting Quality Rating</span>
        </div>
        <span className={`quality-badge ${badgeColorClass}`}>
          {score}% - {level}
        </span>
      </div>

      <div className="quality-bar-track">
        <div
          className={`quality-bar-fill ${badgeColorClass}`}
          style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
        />
      </div>

      <div className="quality-stats-grid">
        <div className="quality-stat-item">
          <span className="quality-stat-label">Model Consensus</span>
          <span className="quality-stat-value">{consensusCount}/{totalAlgorithms} Models ({consensusRatio}%)</span>
        </div>
        <div className="quality-stat-item">
          <span className="quality-stat-label">Stroke Clarity</span>
          <span className="quality-stat-value">
            {qualityData.stroke_clarity_score !== undefined ? `${Math.round(qualityData.stroke_clarity_score * 100)}%` : '95%'}
          </span>
        </div>
      </div>

      <p className="quality-feedback-text">
        <Info size={14} className="info-icon" /> {feedback}
      </p>
    </div>
  );
}
