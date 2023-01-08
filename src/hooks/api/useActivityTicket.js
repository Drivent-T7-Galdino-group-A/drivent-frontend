import useAsync from '../useAsync';
import useToken from '../useToken';
import * as activityApi from '../../services/activityApi';

export default function useActivityTicket(activityId) {
  const token = useToken();

  const {
    data: activityTicket,
    loading: activityTicketLoading,
    error: activityTicketError,
    act: getActivityTicket,
  } = useAsync(() => activityApi.getActivityTicket(token, activityId));

  return {
    activityTicket,
    activityTicketLoading,
    activityTicketError,
    getActivityTicket,
  };
}
