import useHotels from '../../hooks/api/useHotels';
import Hotel from './Hotel';

export default function MenuHotel() {
  const { hotels } = useHotels();

  return (
    <>
      {hotels?.map((hotel, index) => (
        <Hotel key={index} name={hotel.name} image={hotel.image} rooms={hotel.Rooms}></Hotel>
      ))}
    </>
  );
}
