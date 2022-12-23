import styled from 'styled-components';
import Icon from './Icon';

function iconsData(capacity, bookingCount) {
  let icons = [];
  let bookingCounter = bookingCount;

  for(let i = 0; i < capacity; i++) {
    let available;

    if(capacity - bookingCounter > 0) {
      available = true;
      bookingCounter++;
    } else {
      available = false;
    }

    let icon = { position: i, available, bookingCount };

    icons.push(icon);
  }

  return icons;
}

function checkRoomVacancy(capacity, bookingCount) {
  if(capacity === bookingCount) return true;
  return false;
}

export default function Room({ room, selected, selecteRoomHandler }) {
  const iconsList = iconsData(room.capacity, room._count.Booking);
  const isRoomFull = checkRoomVacancy(room.capacity, room._count.Booking);

  return (
    <RoomBox selected={selected} isRoomFull={isRoomFull} onClick={selecteRoomHandler}>
      <h2>{room?.name}</h2>
      <IconBox>
        {iconsList.map((icon, index) => (
          <Icon key={index} icon={icon} selected={selected} capacity={room.capacity} />
        ))}
      </IconBox>
    </RoomBox>
  );
}

const RoomBox = styled.div`
  background-color: ${(props) => (props.isRoomFull ? '#E9E9E9' : (props.selected ? '#FFEED2' : ''))};
  color: ${(props) => (props.isRoomFull ? '#9D9D9D' : '#454545')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 190px;
  height: 45px;
  padding: 11px 10px 9px 16px;
  border: 1px solid #CECECE;
  border-radius: 10px;
  cursor: ${(props) => (props.isRoomFull ? 'not-allowed' : 'pointer')};

  h2 {
    font-size: 20px;
    font-weight: 700;
  }
`;

const IconBox = styled.div`
  font-size: 30px;
`;
