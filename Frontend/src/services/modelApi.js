import { request } from './api';

export async function getModelInfo() {
  return await request('/model/info');
}

export async function reloadModel() {
  return await request('/model/reload', {
    method: 'POST'
  });
}
