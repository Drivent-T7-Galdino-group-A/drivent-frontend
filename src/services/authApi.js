import api from './api';

export async function signIn(email, password) {
  const response = await api.post('/auth/sign-in', { email, password });
  return response.data;
}

export async function signInWithFirebase(body) {
  const response = await api.post('/auth/firebase', body);
  return response.data;
}
//
