import './ConfidenceBar.css';

export default function ConfidenceBar({ confidence = 0 }) {
  const numConf = Number(confidence) || 0;

  const getConfidenceLevel = (val) => {
    if (val >= 90) return 'high';
    if (val >= 60) return 'medium';
    return 'low';
  };

  const levelClass = getConfidenceLevel(numConf);

  return (
    <div className="confidence-bar-card">
      <div className="confidence-bar-header">
        <span className="confidence-label">Model Certainty</span>
        <span className="confidence-value mono" style={{ color: `var(--${levelClass}-color, #22d3ee)` }}>
          {numConf}%
        </span>
      </div>
      <div className="confidence-track">
        <div
          className={`confidence-fill ${levelClass}`}
          style={{ width: `${Math.min(Math.max(numConf, 2), 100)}%` }}
        />
      </div>
    </div>
  );
}
