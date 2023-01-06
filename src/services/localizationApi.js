import api from './api';

export async function getLocalizations(token) {
  const response = await api.get('/localizations', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
