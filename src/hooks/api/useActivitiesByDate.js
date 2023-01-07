import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activityApi from '../../services/activityApi';

export default function useActivitiesByDate(param) {
  const token = useToken();

  const {
    data: activitiesByDate,
    loading: activitiesByDateLoading,
    error: activitiesByDateError,
    act: getActivitiesByDate,
  } = useAsync(() => activityApi.getActivitiesByDate(param, token));

  return {
    activitiesByDate,
    activitiesByDateLoading,
    activitiesByDateError,
    getActivitiesByDate,
  };
}
