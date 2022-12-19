import styled from 'styled-components';
import useTicket from '../../../hooks/api/useTicket';
import { StyledTypography } from '../index';

export default function Payment() {
  const { ticket } = useTicket();

  return (
    <>
      {ticket ? (
        <>
          <StyledTypography variant="h5">Ingresso escolhido</StyledTypography>
          <TicketRecord>
            {ticket.TicketType.name} {ticket.TicketType.includesHotel === true ? '+ Com Hotel' : ''}
            <h6>R$ {ticket.TicketType.price / 100}</h6>
          </TicketRecord>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

const TicketRecord = styled.div`
  background-color: #ffeed2;
  width: 290px !important;
  font-family: Roboto;
  border: none !important;

  h6 {
    margin-top: 8px !important;
  }
`;
