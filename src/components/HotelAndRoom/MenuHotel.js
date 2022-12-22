import styled from 'styled-components';
import useHotels from '../../hooks/api/useHotels';
import Hotel from './Hotel';

export default function MenuHotel({ selectedHotel, selectHotelHandler }) {
  const { hotels } = useHotels();
  console.log(hotels);

  return (
    <HotelContainer>
      {hotels?.map((hotel, index) => (
        <Hotel
          key={index}
          name={hotel.name}
          image={hotel.image}
          rooms={hotel.Rooms}
          selected={hotel.id === selectedHotel}
          selectHotelHandler={() => selectHotelHandler(hotel.id)}
        />
      ))}
    </HotelContainer>
  );
}

export const HotelContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 19px;
`;
