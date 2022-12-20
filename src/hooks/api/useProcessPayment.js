import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';

export default function useProcessPayment() {
  const token = useToken();

  const {
    loading: processPaymentLoading,
    error: processPaymentError,
    act: processPayment
  } = useAsync((data) => paymentApi.processPayment(data, token), false);

  return {
    processPaymentLoading,
    processPaymentError,
    processPayment
  };
}
