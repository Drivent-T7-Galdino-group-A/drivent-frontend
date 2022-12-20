import { useEffect, useState } from 'react';
import useEnrollment from '../../hooks/api/useEnrollment';
import useTicket from '../../hooks/api/useTicket';
import Payment from './Payment';
import ReserveTicket from './ReserveTicket';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { Wrapper } from './Wrapper';
import useTicketTypes from '../../hooks/api/useTicketTypes';

export default function TicketAndPayment() {
  const { enrollment } = useEnrollment();
  const { ticketTypes } = useTicketTypes();
  const { ticket } = useTicket();
  const [isRemote, setIsRemote] = useState('');
  const [includesHotel, setIncludesHotel] = useState('');
  const [total, setTotal] = useState(0);
  const [finishPayment, setFinishPayment] = useState(false);
  const [onlineTicket, setOnlineTicket] = useState({});
  const [withoutHotelTicket, setWithoutHotelTicket] = useState({});
  const [withHotelTicket, setWithHotelTicket] = useState({});

  useEffect(() => {
    ticketTypes?.map((ticket) => {
      if (ticket.isRemote === true) {
        setOnlineTicket(ticket);
      }
      if (ticket.isRemote === false && ticket.includesHotel === false) {
        setWithoutHotelTicket(ticket);
      }
      if (ticket.isRemote === false && ticket.includesHotel === true) {
        setWithHotelTicket(ticket);
      }
    });
  }, [ticketTypes]);

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <Wrapper enrollment={enrollment}>
        {enrollment ? (
          <>
            {finishPayment || ticket ? (
              <Payment />
            ) : (
              <>
                <StyledTypography variant="h5">Primeiro, escolha sua modalidade de ingresso</StyledTypography>
                <Types>
                  <TypePresencial
                    onClick={() => {
                      setIsRemote('false');
                      if (total < withoutHotelTicket?.price) {
                        setTotal(withoutHotelTicket?.price);
                      }
                    }}
                    type={isRemote}
                  >
                    Presencial
                    <h6>R$ {withoutHotelTicket?.price / 100}</h6>
                  </TypePresencial>
                  <TypeOnline
                    onClick={() => {
                      setIsRemote('true');
                      setIncludesHotel('');
                      setTotal(onlineTicket?.price);
                    }}
                    type={isRemote}
                  >
                    Online
                    <h6>R$ {onlineTicket?.price / 100}</h6>
                  </TypeOnline>
                </Types>
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
                    <Types>
                      <TypeNoHotel
                        onClick={() => {
                          setIncludesHotel('false');
                          setTotal(withoutHotelTicket?.price);
                        }}
                        type={includesHotel}
                      >
                        Sem Hotel<h6>+ R$ 0</h6>
                      </TypeNoHotel>
                      <TypeHotel
                        onClick={() => {
                          setIncludesHotel('true');
                          setTotal(withHotelTicket?.price);
                        }}
                        type={includesHotel}
                      >
                        Com Hotel<h6>+ R$ {(withHotelTicket?.price - withoutHotelTicket?.price) / 100}</h6>
                      </TypeHotel>
                    </Types>
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
          <span>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</span>
        )}
      </Wrapper>
    </>
  );
}

export const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const Types = styled.div`
  width: 315px;
  margin-bottom: 40px;
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
