import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function useSaveBooking() {
  const token = useToken();

  const {
    loading: saveBookingLoading, 
    error: saveBookingError, 
    act: saveBooking, 
  } = useAsync((data) => bookingApi.save(data, token), false);

  return {
    saveBookingLoading, 
    saveBookingError, 
    saveBooking
  };
}
