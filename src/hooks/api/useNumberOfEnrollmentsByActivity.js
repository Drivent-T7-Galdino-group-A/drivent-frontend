import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activityApi from '../../services/activityApi';

export default function useNumberOfEnrollmentsByActivity(activityId) {
  const token = useToken();

  const {
    data: numberOfEnrollmentsByActivity,
    loading: numberOfEnrollmentsByActivityLoading,
    error: numberOfEnrollmentsByActivityError,
    act: getNumberOfEnrollmentsByActivity,
  } = useAsync(() => activityApi.getNumberOfEnrollmentsByActivity(token, activityId));

  return {
    numberOfEnrollmentsByActivity, 
    numberOfEnrollmentsByActivityLoading, 
    numberOfEnrollmentsByActivityError, 
    getNumberOfEnrollmentsByActivity
  };
}
