import api from './api';

export async function save(body, token) {
  const response = await api.post('/booking', body, {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });

  return response.data;
}
