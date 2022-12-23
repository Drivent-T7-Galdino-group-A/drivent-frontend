import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function useChangeBooking() {
  const token = useToken();

  const {
    loading: changeBookingLoading,
    error: changeBookingError,
    act: changeBooking,
  } = useAsync((bookingId, data) => bookingApi.changeBooking(bookingId, data, token), false);

  return {
    changeBookingLoading,
    changeBookingError,
    changeBooking,
  };
}
