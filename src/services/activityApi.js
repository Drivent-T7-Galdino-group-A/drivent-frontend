import api from './api';

export async function getActivitiesByDate(date, token) {
  const response = await api.get(`/activities/date/${date}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
