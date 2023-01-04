import styled from 'styled-components';
import dayjs from 'dayjs';

export default function Dates({ date, selected, selectDateHandler }) {
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
