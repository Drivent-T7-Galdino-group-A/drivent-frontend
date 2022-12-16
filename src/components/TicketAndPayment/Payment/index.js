import styled from 'styled-components';
import { StyledTypography } from '../index';

export default function Payment({ isRemote, includesHotel, total }) {
  return (
    <>
      <StyledTypography variant="h5">Ingresso escolhido</StyledTypography>
      <TicketRecord>
        {isRemote === 'true' ? 'Online' : 'Presencial'} {includesHotel === 'false' ? '' : '+ Com Hotel'}
        <h6>R${total}</h6>
      </TicketRecord>
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
