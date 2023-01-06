import useAsync from '../useAsync';
import useToken from '../useToken';
import * as activityApi from '../../services/activityApi';

export default function useCreateActivity() {
  const token = useToken();

  const {
    loading: createActivityLoading,
    error: createActivityError,
    act: createActivity,
  } = useAsync((data) => activityApi.create(data, token), false);

  return {
    createActivity,
    createActivityLoading,
    createActivityError,
  };
}
