import 'dayjs/locale/pt-br';
import { StyledTypography } from '../TicketAndPayment/index';
import Dates from './Dates';

function filterDates(activities) {
  let allDates = activities?.map((a) => a.date.slice(0, 10));

  let filter = allDates?.filter((elem, i) => allDates.indexOf(elem) === i);
  return filter;
}

export default function MenuActivity({ selectedDate, selectDateHandler, activities }) {
  const dates = filterDates(activities);

  let callToFilter = '';

  if(selectedDate === 0) {
    callToFilter = (
      <StyledTypography variant="h5">Primeiro, filtre pelo dia do evento: </StyledTypography>
    );
  }

  return (
    <>
      {callToFilter}
      {dates?.map((date, index) => (
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
