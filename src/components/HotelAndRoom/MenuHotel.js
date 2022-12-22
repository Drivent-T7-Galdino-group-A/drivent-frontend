import styled from 'styled-components';
import useHotels from '../../hooks/api/useHotels';
import Hotel from './Hotel';

export default function MenuHotel({ selectedHotel, selectHotelHandler, isRoomSelected }) {
  const { hotels } = useHotels();

  return (
    <HotelContainer isRoomSelected={isRoomSelected}>
      {isRoomSelected ? (
        <Hotel
          name={'Driven Resort'}
          image={'https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg'}
          selected={true}
          isRoomSelected={true}
        />
      ) : (
        hotels?.map((hotel, index) => (
          <Hotel
            key={index}
            name={hotel.name}
            image={hotel.image}
            rooms={hotel.Rooms}
            selected={hotel.id === selectedHotel}
            selectHotelHandler={() => selectHotelHandler(hotel.id)}
          />
        ))
      )}
    </HotelContainer>
  );
}

export const HotelContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.isRoomSelected ? 'column' : '')};
  flex-wrap: wrap;
  width: 100%;
  gap: 19px;
`;
