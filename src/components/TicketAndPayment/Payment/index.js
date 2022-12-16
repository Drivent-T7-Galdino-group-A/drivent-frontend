import styled from 'styled-components';
import { StyledTypography } from '../index';

export default function Payment({ selectedType }) {
  //aguardando props se será com ou sem hotel
  //aguardando props do valor da compra
  return (
    <>
      <StyledTypography variant="h5">Ingresso escolhido</StyledTypography>
      <TicketRecord>
        {selectedType} {selectedType === 'Online' ? '' : ' + Com Hotel'}
        <h6>R${selectedType === 'Online' ? '100,00' : ''}</h6>
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
