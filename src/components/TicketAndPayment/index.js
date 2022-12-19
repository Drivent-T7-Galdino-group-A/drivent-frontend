import { useState } from 'react';
import useEnrollment from '../../hooks/api/useEnrollment';
import Payment from './Payment';
import ReserveTicket from './ReserveTicket';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { Wrapper } from './Wrapper';

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
              <Payment isRemote={isRemote} includesHotel={includesHotel} total={total} />
            ) : (
              <>
                <StyledTypography variant="h5">Primeiro, escolha sua modalidade de ingresso</StyledTypography>
                <TypePresencial
                  onClick={() => {
                    setIsRemote('false');
                    if (total < 25000) {
                      setTotal(25000);
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
                    setTotal(10000);
                  }}
                  type={isRemote}
                >
                  Online
                  <h6>R$ 100</h6>
                </TypeOnline>

                {isRemote === 'true' && (
                  <ReserveTicket
                    total={total}
                    setFinishPayment={setFinishPayment}
                    enrollmentId={enrollment.id}
                  ></ReserveTicket>
                )}

                {isRemote === 'false' && (
                  <>
                    <StyledTypography variant="h5">Ótimo! Agora escolha sua modalidade de hospedagem</StyledTypography>
                    <TypeNoHotel
                      onClick={() => {
                        setIncludesHotel('false');
                        setTotal(25000);
                      }}
                      type={includesHotel}
                    >
                      Sem Hotel<h6>+ R$ 0</h6>
                    </TypeNoHotel>
                    <TypeHotel
                      onClick={() => {
                        setIncludesHotel('true');
                        setTotal(60000);
                      }}
                      type={includesHotel}
                    >
                      Com Hotel<h6>+ R$ 350</h6>
                    </TypeHotel>
                    {includesHotel && (
                      <ReserveTicket
                        total={total}
                        setFinishPayment={setFinishPayment}
                        enrollmentId={enrollment.id}
                      ></ReserveTicket>
                    )}
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

const TypePresencial = styled.div`
  ${(props) => (props.type === 'false' ? 'background-color: #FFEED2;' : '')}
`;

const TypeOnline = styled.div`
  ${(props) => (props.type === 'true' ? 'background-color: #FFEED2;' : '')}
`;

const TypeHotel = styled.div`
  ${(props) => (props.type === 'true' ? 'background-color: #FFEED2;' : '')}
`;

const TypeNoHotel = styled.div`
  ${(props) => (props.type === 'false' ? 'background-color: #FFEED2;' : '')}
`;
