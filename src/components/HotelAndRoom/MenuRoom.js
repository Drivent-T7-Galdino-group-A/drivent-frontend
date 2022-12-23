import { toast } from 'react-toastify';
import styled from 'styled-components';
import useSaveBooking from '../../hooks/api/useSaveBooking';
import Room from './Room';

export default function MenuRoom({ rooms, setIsRoomSelected, selectedRoom, setSelectedRoom }) {
  const { bookingLoading, saveBooking } = useSaveBooking(selectedRoom);

  function selecteRoomHandler(room) {
    if (room.id === selectedRoom) {
      setSelectedRoom(0);
    } else {
      if (room.capacity !== room._count.Booking) {
        setSelectedRoom(room.id);
      } else {
        setSelectedRoom(0);
      }
    }
  }

  async function submitBooking(roomId) {
    try {
      await saveBooking({ roomId });
      setSelectedRoom(0);
      setIsRoomSelected(true);
      toast('Reserva realizada com sucesso!');
    } catch (err) {
      toast('Não foi possível realizar a reserva!');
    }
  }

  return (
    <RoomsWrapper>
      <RoomsContainer>
        {rooms?.map((room, index) => (
          <Room
            key={index}
            room={room}
            selected={room.id === selectedRoom}
            selecteRoomHandler={() => selecteRoomHandler(room)}
          />
        ))}
      </RoomsContainer>
      {selectedRoom > 0 && (
        <BookingButton onClick={() => submitBooking(selectedRoom)} disabled={bookingLoading}>
          RESERVAR QUARTO
        </BookingButton>
      )}
    </RoomsWrapper>
  );
}

const RoomsWrapper = styled.div`
  padding-bottom: 5px;
`;

const RoomsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding-top: 15px;
  gap: 8px 16px;
  margin-bottom: 46px;
`;

const BookingButton = styled.button`
  background-color: #e0e0e0;
  font-family: 'Roboto';
  font-size: 14px;
  width: 182px;
  height: 37px;
  padding-top: 3px;
  margin-bottom: 50px;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;
