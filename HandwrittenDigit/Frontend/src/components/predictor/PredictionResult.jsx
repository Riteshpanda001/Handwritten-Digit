import './PredictionResult.css';

export default function PredictionResult({ prediction = '?', confidence = 0 }) {
  const isPredicted = prediction !== '?' && prediction !== null && prediction !== undefined;

  return (
    <div className="prediction-result-card">
      <div className={`prediction-digit-box ${isPredicted ? 'has-prediction' : ''}`}>
        {prediction}
      </div>
      <div className="prediction-result-meta">
        <h4 className="prediction-title">Predicted Digit</h4>
        <p className="prediction-subtitle">
          {isPredicted
            ? `Classified with ${confidence}% softmax confidence score`
            : 'Draw a digit or upload an image and click classify to inspect results'}
        </p>
      </div>
    </div>
  );
}
