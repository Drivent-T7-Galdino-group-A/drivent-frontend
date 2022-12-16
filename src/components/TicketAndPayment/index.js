import { useState } from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { Wrapper } from './Wrapper';
import { TypeOnline } from './TypeOnline';
import { TypePresencial } from './TypePresencial';
import useEnrollment from '../../hooks/api/useEnrollment';
import Payment from './Payment';
import { TypeHotel } from './TypeHotel';
import { TypeNoHotel } from './TypeNoHotel';

export default function TicketAndPayment() {
  const [isRemote, setIsRemote] = useState('');
  const [includesHotel, setIncludesHotel] = useState('');
  const [total, setTotal] = useState(0);
  const [finishPayment, setFinishPayment] = useState(false);
  const { enrollment } = useEnrollment();

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <Wrapper>
        {enrollment ? (
          <>
            {finishPayment ? (
              <Payment isRemote={isRemote} />
            ) : (
              <>
                <StyledTypography variant="h5">Primeiro, escolha sua modalidade de ingresso</StyledTypography>
                <TypePresencial
                  onClick={() => {
                    setIsRemote('false');
                    if (total < 250) {
                      setTotal(250);
                    }
                  }}
                  type={isRemote}
                >
                  Presencial
                  <h6>R$ 250</h6>
                </TypePresencial>
                <TypeOnline
                  onClick={() => {
                    setIsRemote('true');
                    setIncludesHotel('');
                    setTotal(100);
                  }}
                  type={isRemote}
                >
                  Online
                  <h6>R$ 100</h6>
                </TypeOnline>

                {isRemote === 'false' && (
                  <>
                    <StyledTypography variant="h5">Ótimo! Agora escolha sua modalidade de hospedagem</StyledTypography>
                    <TypeNoHotel
                      onClick={() => {
                        setIncludesHotel('false');
                        setTotal(250);
                      }}
                      type={includesHotel}
                    >
                      Sem Hotel<h6>+ R$ 0</h6>
                    </TypeNoHotel>
                    <TypeHotel
                      onClick={() => {
                        setIncludesHotel('true');
                        setTotal(600);
                      }}
                      type={includesHotel}
                    >
                      Com Hotel<h6>+ R$ 350</h6>
                    </TypeHotel>
                    {includesHotel ? (
                      <>
                        <StyledTypography variant="h5">
                          Fechado! O total ficou em <strong>R$ {total}</strong>. Agora é só confirmar:
                        </StyledTypography>
                        <SubmitButton onClick={() => setFinishPayment(true)}>RESERVAR INGRESSO</SubmitButton>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}
                {isRemote === 'true' && (
                  <>
                    <StyledTypography variant="h5">
                      Fechado! O total ficou em <strong>R$ {total}</strong>. Agora é só confirmar:
                    </StyledTypography>
                    <SubmitButton
                      onClick={() => {
                        setIncludesHotel('false');
                        setFinishPayment(true);
                      }}
                    >
                      RESERVAR INGRESSO
                    </SubmitButton>
                  </>
                )}
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

const SubmitButton = styled.button`
  margin-top: 10px !important;
  height: 37px !important;
  width: 162px !important;
  box-shadow: 0px 2px 10px 0px #00000040;
  background: #e0e0e0;
  border: none;
  border-radius: 4px;
  color: #000000;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
`;
