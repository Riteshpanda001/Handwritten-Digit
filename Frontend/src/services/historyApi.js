import { request } from './api';

export async function getPredictionHistory({ skip = 0, limit = 50, digit = null } = {}) {
  const params = new URLSearchParams();
  params.append('skip', skip);
  params.append('limit', limit);
  if (digit !== null && digit !== undefined && digit !== '') {
    params.append('digit', digit);
  }

  return await request(`/history?${params.toString()}`);
}

export async function clearPredictionHistory() {
  return await request('/history/clear', {
    method: 'DELETE'
  });
}
