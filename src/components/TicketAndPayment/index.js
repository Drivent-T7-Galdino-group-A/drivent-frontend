import { useState } from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { Wrapper } from './Wrapper';
import { TypeOnline } from './TypeOnline';
import { TypePresencial } from './TypePresencial';
import useEnrollment from '../../hooks/api/useEnrollment';
import Payment from './Payment';

export default function TicketAndPayment() {
  const [selectedType, setSelectedType] = useState('');
  const [finishPayment, setFinishPayment] = useState(false);
  const { enrollment } = useEnrollment();

  function typeSelect(type) {
    setSelectedType(type);
  }

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <Wrapper>
        {enrollment ? (
          <>
            {finishPayment ? (
              <Payment selectedType={selectedType} />
            ) : (
              <>
                <StyledTypography variant="h5">Primeiro, escolha sua modalidade de ingresso</StyledTypography>
                <TypePresencial onClick={() => typeSelect('Presencial')} type={selectedType}>
                  Presencial
                  <h6>R$ 250</h6>
                </TypePresencial>
                <TypeOnline onClick={() => typeSelect('Online')} type={selectedType}>
                  Online
                  <h6>R$ 100</h6>
                </TypeOnline>
              </>
            )}
          </>
        ) : (
          <>Por favor, finalize sua inscrição para ter acesso a esta página.</>
        )}
      </Wrapper>
    </>
  );
}

export const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const SubmitContainer = styled.div`
  margin-top: 40px !important;
  width: 100% !important;

  > button {
    margin-top: 0 !important;
  }
`;
