import { request, setAuthToken, getAuthToken } from './api';

export async function loginUser(email, password) {
  const data = await request('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (data.access_token) {
    setAuthToken(data.access_token);
  }
  return data;
}

export async function registerUser(full_name, email, password) {
  const data = await request('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ full_name, email, password })
  });

  if (data.access_token) {
    setAuthToken(data.access_token);
  }
  return data;
}

export async function getCurrentUser() {
  const token = getAuthToken();
  if (!token) return null;
  try {
    return await request('/auth/me');
  } catch (err) {
    setAuthToken(null);
    return null;
  }
}

export function logoutUser() {
  setAuthToken(null);
}
