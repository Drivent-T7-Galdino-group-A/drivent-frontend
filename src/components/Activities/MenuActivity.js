import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import styled from 'styled-components';
import useActivities from '../../hooks/api/useActivities';
import { StyledTypography } from '../TicketAndPayment/index';

function filterDates() {
  const { activities } = useActivities();

  let allDates = activities?.map((a) => a.date.slice(0, 10));

  let filter = allDates?.filter((elem, i) => allDates.indexOf(elem) === i);
  return filter;
}

export default function MenuActivity({ selectedDate, selectDateHandler }) {
  const dates = filterDates();

  return (
    <>
      <StyledTypography variant="h5">Primeiro, filtre pelo dia do evento: </StyledTypography>
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

function Dates({ date, selected, selectDateHandler }) {
  let dayWeek = dayjs(date).locale('pt-br').format('dddd, DD/MM').replace('-feira', '');

  return (
    <Button selected={selected} onClick={selectDateHandler}>
      {dayWeek}
    </Button>
  );
}

const Button = styled.button`
  height: 37px;
  width: 131px;
  font-family: Roboto;
  font-size: 14px;
  color: #000000;
  font-weight: 400;
  border-radius: 4px;
  border: none;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  margin-right: 17px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? '#FFD37D' : '#e0e0e0')};
`;
