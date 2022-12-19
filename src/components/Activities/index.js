import { StyledTypography } from '../TicketAndPayment';
import { Wrapper } from './Wrapper';
import useTicket from '../../hooks/api/useTicket';

export default function ActivitiesSelection() {
  const { ticket } = useTicket();

  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      <Wrapper paymentStatus={ticket?.status}>
        {ticket?.status === 'PAID' ? (
          <>Atividades: Em breve!</>
        ) : (
          <span>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</span>
        )}
      </Wrapper>
    </>
  );
}
