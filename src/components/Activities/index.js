import { useEffect, useState } from 'react';
import { StyledTypography } from '../TicketAndPayment';
import { Wrapper } from './Wrapper';
import useTicket from '../../hooks/api/useTicket';

export default function ActivitiesSelection() {
  const { ticket } = useTicket();
  const [paymentStatus, setPaymentStatus] = useState('');

  useEffect(() => {
    if (ticket) {
      setPaymentStatus(ticket.status);
    }
  }, []);

  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      <Wrapper paymentStatus={paymentStatus}>
        {paymentStatus === 'PAID' ? (
          <>Atividades: Em breve!</>
        ) : (
          <span>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</span>
        )}
      </Wrapper>
    </>
  );
}
