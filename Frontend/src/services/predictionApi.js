import { request } from './api';

export function normalizePredictionResponse(data) {
  if (!data) return null;

  const predictedDigit = data.predicted_digit !== undefined ? data.predicted_digit : '?';
  const confidencePercent = data.confidence !== undefined ? +(data.confidence * 100).toFixed(1) : 0;

  let probsList = [];
  if (Array.isArray(data.probabilities) && data.probabilities.length > 0) {
    probsList = data.probabilities.map((item) => ({
      digit: item.digit,
      name: item.name || `Digit ${item.digit}`,
      confidence: +(item.confidence * 100).toFixed(1)
    }));
  } else if (data.confidence_scores && typeof data.confidence_scores === 'object') {
    probsList = Array.from({ length: 10 }, (_, d) => {
      const val = data.confidence_scores[d] || data.confidence_scores[String(d)] || 0;
      return {
        digit: d,
        name: `Digit ${d}`,
        confidence: +(val * 100).toFixed(1)
      };
    });
  } else {
    probsList = Array.from({ length: 10 }, (_, d) => ({
      digit: d,
      name: `Digit ${d}`,
      confidence: d === predictedDigit ? confidencePercent : 0
    }));
  }

  // Ensure digits 0 to 9 are all present
  const fullProbabilities = Array.from({ length: 10 }, (_, d) => {
    const found = probsList.find((p) => p.digit === d);
    return found || { digit: d, name: `Digit ${d}`, confidence: 0 };
  });

  return {
    digit: predictedDigit,
    digitName: data.digit_name || `Digit ${predictedDigit}`,
    confidence: confidencePercent,
    probabilities: fullProbabilities,
    recordId: data.record_id || null,
    createdAt: data.created_at || new Date().toISOString()
  };
}

export async function predictCanvas(image_data) {
  if (!image_data) {
    throw new Error('Canvas drawing is empty or invalid.');
  }

  const rawData = await request('/predict/canvas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ image_data })
  });

  return normalizePredictionResponse(rawData);
}

export async function predictImage(file) {
  if (!file) {
    throw new Error('Please select an image file to predict.');
  }

  const formData = new FormData();
  formData.append('file', file);

  const rawData = await request('/predict/image', {
    method: 'POST',
    body: formData
  });

  return normalizePredictionResponse(rawData);
}
