import api from './api';

export async function getActivitiesByDate(date, token) {
  const response = await api.get(`/activities/date/${date}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getNumberOfEnrollmentsByActivity(token, activityId) {
  const response = await api.get(`/activities/activity-tickets/${activityId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getActivityTicket(token, activityId) {
  const response = await api.get(`/activities/tickets/${activityId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function create(body, token) {
  const response = await api.post('/activities', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
