import api from './api';

export async function getDates(token) {
  const response = await api.get('/dates', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
