import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import useTicketTypes from '../../hooks/api/useTicketTypes';
import useCreateTicket from '../../hooks/api/useCreateTicket';
import { toast } from 'react-toastify';

export default function ReserveTicket({ total, setFinishPayment, enrollmentId }) {
  const { ticketTypes } = useTicketTypes();
  const { createTicket } = useCreateTicket();

  return (
    <>
      <StyledTypography variant="h5">
        Fechado! O total ficou em <strong>R$ {total / 100}</strong>. Agora é só confirmar:
      </StyledTypography>
      <SubmitButton
        onClick={() => {
          ticketTypes.map(async(ticketType) => {
            if (ticketType.price === total) {
              try {
                await createTicket({ ticketTypeId: ticketType.id });
                toast('Informações salvas com sucesso!');
                setFinishPayment(true);
              } catch (err) {
                toast('Não foi possível salvar suas informações!');
              }
            }
          });
        }}
      >
        RESERVAR INGRESSO
      </SubmitButton>
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

  @media (max-width: 600px) {
    margin-bottom: 10px !important;
  }
`;
