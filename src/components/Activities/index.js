import { StyledTypography } from '../TicketAndPayment';
import { Wrapper } from './Wrapper';
import useTicket from '../../hooks/api/useTicket';
import useDates from '../../hooks/api/useDates';
import MenuActivity from './MenuActivity';
import Schedule from './Schedule';
import { useState } from 'react';

export default function ActivitiesSelection() {
  const [selectedDate, setSelectedDate] = useState(0);
  const { ticket } = useTicket();
  const { dates } = useDates();

  function selectDateHandler(date) {
    if (date === selectedDate) {
      setSelectedDate(0);
    } else {
      setSelectedDate(date);
    }
  }

  let content;
  let schedule = '';

  if (ticket?.TicketType.isRemote) {
    content = (
      <span>Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.</span>
    );
  }

  if (ticket?.status === 'RESERVED' || !ticket) {
    content = <span>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</span>;
  }

  if (ticket?.status === 'PAID' && !ticket?.TicketType.isRemote) {
    content = (
      <MenuActivity
        selectedDate={selectedDate}
        selectDateHandler={selectDateHandler}
        dates={dates}
      />
    );
  }

  if (selectedDate !== 0) {
    schedule = (
      <Schedule
        selectedDate={selectedDate}
        ticket={ticket}
      />
    );
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      <Wrapper paymentStatus={ticket?.status} isRemote={ticket?.TicketType.isRemote}>
        {content}
        {schedule}
      </Wrapper>
    </>
  );
}
