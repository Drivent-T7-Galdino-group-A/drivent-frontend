import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import useTicket from '../../../hooks/api/useTicket';
import useProcessPayment from '../../../hooks/api/useProcessPayment';
import { StyledTypography } from '../index';
import CreditCard from './CreditCard';
import { FaCheckCircle } from 'react-icons/fa';

export default function Payment() {
  const { ticket } = useTicket();
  const { processPayment, processPaymentLoading } = useProcessPayment();

  const initialState = {
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
    issuer: ''
  };

  const [state, setState] = useState(initialState);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await processPayment({
        ticketId: ticket?.id,
        cardData: {
          issuer: state.issuer,
          number: state.number,
          name: state.name,
          expirationDate: state.expiry,
          cvc: state.cvc
        }
      });
      toast('Pagamento efetuado com sucesso!');
    } catch (error) {
      toast('Não foi possível efetuar o pagamento!');
    }
  }

  return (
    <>
      <StyledTypography variant="h5">Ingresso escolhido</StyledTypography>
      <TicketRecord>
        <h5>{ticket?.TicketType.name} {ticket?.TicketType.includesHotel === true ? '+ Com Hotel' : ''}</h5>
        <h6>R$ {ticket?.TicketType.price / 100}</h6>
      </TicketRecord>
      <StyledTypography variant="h5">Pagamento</StyledTypography>
      {ticket?.status === 'PAID' ? (
        <PaymentConcluded>
          <FaCheckCircle
            size='40px'
            color='#36B853'
          />
          <div>
            <span>Pagamento confirmado!</span>
            <span>Prossiga para escolha de hospedagem e atividades</span>
          </div>
        </PaymentConcluded>
      ) : (
        <>
          <CreditCard state={state} setState={setState} />
          <SubmitButton
            onClick={handleSubmit}
            disabled={processPaymentLoading}
          >
            FINALIZAR PAGAMENTO
          </SubmitButton>
        </>
      )}
    </>
  );
}

const TicketRecord = styled.div`
  background-color: #ffeed2;
  width: 290px !important;
  height: 110px;
  border: none !important;
  border-radius: 20px;

  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  text-align: center;

  margin-bottom: 30px;
  padding: 35px 0 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h5 {
    font-size: 16px;
    line-height: 19px;
    color: #454545;
  }

  h6 {
    font-size: 14px;
    line-height: 16px;
    color: #898989;
  }
`;

const SubmitButton = styled.button`
  margin-top: 50px;
  height: 37px;
  width: 200px;
  box-shadow: 0px 2px 10px 0px #00000040;
  background: #e0e0e0;
  border: none;
  border-radius: 4px;
  color: #000000;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
`;

const PaymentConcluded = styled.div`
  > div:last-child {
    cursor: default;
    border: none;
    height: 40px;
    margin-left: 150px;

    > span {
      font-family: 'Roboto', sans-serif;
      text-align: left;
      font-size: 16px;
      line-height: 19px;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
      color: #454545;
    }

    > span:nth-child(1) {
      font-weight: 700;
    }

    > span:nth-child(2) {
      font-weight: 400;
    }
  }
  
`;
