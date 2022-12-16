import { useState } from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { Wrapper } from './Wrapper';
import { TypeSelect } from './TypeSelect';

export default function TicketAndPayment() {
  const [selectedType, setSelectedType] = useState('');

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <Wrapper>
        <StyledTypography variant="h5">Primeiro, escolha sua modalidade de ingresso</StyledTypography>
        <TypeSelect>
          Presencial
          <h6>R$ 250</h6>
        </TypeSelect>
        <TypeSelect>
          Online
          <h6>R$ 100</h6>
        </TypeSelect>
      </Wrapper>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const SubmitContainer = styled.div`
  margin-top: 40px !important;
  width: 100% !important;

  > button {
    margin-top: 0 !important;
  }
`;
