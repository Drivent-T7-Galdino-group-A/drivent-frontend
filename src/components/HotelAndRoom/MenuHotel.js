import { useContext } from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import RoomContext from '../../contexts/RoomContext';
import useHotels from '../../hooks/api/useHotels';
import Hotel from './Hotel';

export default function MenuHotel({ selectedHotel, selectHotelHandler, booking, selectedRoom }) {
  const { hotels } = useHotels();
  const [quantityReserved, setQuantityReserved] = useState(0);
  const [bookedHotel, setBookedHotel] = useState([]);
  const [roomInfo, setRoomInfo] = useState([]);
  const [hotelInfo, setHotelInfo] = useState([]);
  const { isRoomSelected } = useContext(RoomContext);

  useEffect(() => {
    if (selectedRoom > 0) {
      hotels?.map((hotel) => {
        for (let i = 0; i < hotel.Rooms.length; i++) {
          if (hotel.Rooms[i].id === selectedRoom) {
            setRoomInfo(hotel.Rooms[i]);
            setHotelInfo(hotel);
            break;
          }
        }
      });
      return;
    }

    const currentHotel = hotels?.find((hotel) => {
      return hotel.id === booking?.Room.hotelId;
    });
    setBookedHotel(currentHotel);

    const currentRoom = currentHotel?.Rooms.find((room) => {
      return room.id === booking.Room.id;
    });

    setQuantityReserved(currentRoom?._count.Booking);
  }, [booking, hotels, selectedRoom, isRoomSelected]);

  return (
    <HotelContainer booking={booking}>
      {isRoomSelected ? (
        <Hotel
          name={hotelInfo?.name || bookedHotel?.name}
          image={hotelInfo?.image || bookedHotel?.image}
          selected={true}
          roomName={roomInfo?.name || booking?.Room.name}
          capacity={roomInfo?.capacity || booking?.Room.capacity}
          quantityReserved={roomInfo?._count?.Booking + 1 || quantityReserved}
        />
      ) : (
        hotels?.map((hotel, index) => (
          <Hotel
            key={index}
            id={hotel.id}
            name={hotel.name}
            image={hotel.image}
            rooms={hotel.Rooms}
            selected={hotel.id === selectedHotel}
            selectHotelHandler={() => selectHotelHandler(hotel)}
          />
        ))
      )}
    </HotelContainer>
  );
}

export const HotelContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.isRoomSelected || props.booking ? 'column' : '')};
  flex-wrap: wrap;
  width: 100%;
  gap: 19px;
  margin-bottom: 52px;
`;
