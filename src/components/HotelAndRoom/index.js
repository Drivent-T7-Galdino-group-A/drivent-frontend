import { useState } from 'react';
import styled from 'styled-components';
import { StyledTypography } from '../TicketAndPayment';
import { Wrapper } from './Wrapper';

export default function HotelAndRoom() {
  const [finishPayment, setFinishPayment] = useState(false);

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      <Wrapper finishPayment={finishPayment}>
        {finishPayment ? (
          <>'Hotel: Em breve!'</>
        ) : (
          <PaymentConfirmationMessage>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</PaymentConfirmationMessage>
        )}
      </Wrapper>
    </>
  );
}

export const PaymentConfirmationMessage = styled.span`
  color: #8E8E8E;
  font-family: 'Roboto';
  font-size: 20px;
  text-align: center;
  width: 411px;
  height: 46px;
`;
