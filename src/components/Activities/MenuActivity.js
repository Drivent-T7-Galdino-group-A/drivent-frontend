import 'dayjs/locale/pt-br';
import { StyledTypography } from '../TicketAndPayment/index';
import Dates from './Dates';

function formatDates(dates) {
  const formattedDates = dates?.map(date => date.date.slice(0, 10));

  return formattedDates;
}

export default function MenuActivity({ selectedDate, selectDateHandler, dates }) {
  const formattedDates = formatDates(dates);

  let callToFilter = '';

  if(selectedDate === 0) {
    callToFilter = (
      <StyledTypography variant="h5">Primeiro, filtre pelo dia do evento: </StyledTypography>
    );
  }

  return (
    <>
      {callToFilter}
      {formattedDates?.map((date, index) => (
        <Dates
          key={index}
          date={date}
          selected={date === selectedDate}
          selectDateHandler={() => selectDateHandler(date)}
        />
      ))}
    </>
  );
}
