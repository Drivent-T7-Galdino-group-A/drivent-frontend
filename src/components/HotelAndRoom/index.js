import styled from 'styled-components';
import useTicket from '../../hooks/api/useTicket';
import { StyledTypography } from '../TicketAndPayment';
import { Wrapper } from './Wrapper';
import MenuHotel from './MenuHotel';

export default function HotelAndRoom() {
  const { ticket } = useTicket();

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      <Wrapper paymentConfirmed={ticket?.status}>
        {ticket?.status === 'PAID' ? (
          ticket?.ticketType?.includesHotel === true ? (
            <>Hotel: Em breve!</>
          ) : (
            <WarningMessage paymentConfirmed={ticket?.status}>
              Sua modalidade de ingresso não inclui hospedagem. Prossiga para a escolha de atividades
            </WarningMessage>
          )
        ) : (
          <WarningMessage>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</WarningMessage>
        )}
      </Wrapper>
    </>
  );
}

export const WarningMessage = styled.span`
  display: ${(props) => (props.paymentConfirmed === 'PAID' ? 'flex' : '')};
  align-self: ${(props) => (props.paymentConfirmed === 'PAID' ? 'center' : '')};
  margin-left: ${(props) => (props.paymentConfirmed === 'PAID' ? '22%' : '')};
  color: #8e8e8e;
  font-family: 'Roboto';
  font-size: 20px;
  text-align: center;
  width: 411px;
  height: 46px;
`;
