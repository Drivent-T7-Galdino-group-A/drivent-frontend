import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useHotels from '../../hooks/api/useHotels';
import Hotel from './Hotel';

export default function MenuHotel({ selectedHotel, selectHotelHandler, isRoomSelected, booking, selectedRoom }) {
  const { hotels } = useHotels();
  const [quantityReserved, setQuantityReserved] = useState(0);
  const [bookedHotel, setBookedHotel] = useState([]);
  const [roomInfo, setRoomInfo] = useState([]);
  const [hotelInfo, setHotelInfo] = useState([]);

  useEffect(() => {
    if (selectedRoom > 0) {
      hotels?.map((hotel) => {
        for (let i = 0; i < hotel.Rooms.length; i++) {
          if (hotel.Rooms[i].id === selectedRoom) {
            setRoomInfo(hotel.Rooms[i]);
            setHotelInfo(hotel);
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
  }, [booking, hotels, selectedRoom]);

  return (
    <HotelContainer isRoomSelected={isRoomSelected} booking={booking}>
      {isRoomSelected || booking ? (
        <Hotel
          name={bookedHotel?.name || hotelInfo?.name}
          image={bookedHotel?.image || hotelInfo?.image}
          selected={true}
          isRoomSelected={true}
          roomName={booking?.Room.name || roomInfo?.name}
          capacity={booking?.Room.capacity || roomInfo?.capacity}
          quantityReserved={quantityReserved || roomInfo?._count?.Booking + 1}
        />
      ) : (
        hotels?.map((hotel, index) => (
          <Hotel
            key={index}
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
