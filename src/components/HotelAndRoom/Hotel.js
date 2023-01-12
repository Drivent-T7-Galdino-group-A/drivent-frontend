import { useEffect, useState } from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import RoomContext from '../../contexts/RoomContext';
import useHotels from '../../hooks/api/useHotels';

export default function Hotel({
  name,
  image,
  rooms,
  selected,
  selectHotelHandler,
  quantityReserved,
  roomName,
  capacity,
  id,
}) {
  const accommodations = typesOfAccommodation(rooms);
  const [numberOfAvailablePositions, setNumberOfAvailablePositions] = useState('10');
  const { isRoomSelected, setIsRoomSelected } = useContext(RoomContext);
  const { hotels } = useHotels();

  useEffect(() => {
    let arrayRooms = [];

    hotels?.map((hotel) => {
      for (let i = 0; i < hotel.Rooms.length; i++) {
        if (hotel.id === id) {
          arrayRooms.push(hotel.Rooms[i]);
        }
      }
    });

    let result = arrayRooms.reduce((acc, curr) => acc + (curr.capacity - curr._count.Booking), 0);

    setNumberOfAvailablePositions(result);
  }, [numberOfAvailablePositions, hotels]);

  return (
    <>
      {isRoomSelected ? (
        <>
          <HotelBox selected={selected} onClick={selectHotelHandler}>
            <img src={image} alt="hotel" />
            <h2>{name}</h2>

            <div>
              <h3>Quarto reservado:</h3>
              <p>
                {roomName}
                {capacity === 1 && '(Single)'}
                {capacity === 2 && '(Double)'}
                {capacity === 3 && '(Triple)'}
              </p>
            </div>

            <div>
              <h3>Pessoas no seu quarto:</h3>
              <p>
                {quantityReserved === 1 && 'Somente você'}
                {quantityReserved > 1 && `Você e mais ${quantityReserved - 1}`}
              </p>
            </div>
          </HotelBox>
          <ChangeRoomButton
            onClick={() => {
              setIsRoomSelected(false);
            }}
          >
            TROCAR DE QUARTO
          </ChangeRoomButton>
        </>
      ) : (
        <HotelBox selected={selected} onClick={selectHotelHandler}>
          <img src={image} alt="hotel" />
          <h2>{name}</h2>

          <div>
            <h3>Tipos de acomodação:</h3>
            <p>{accommodations}</p>
          </div>

          <div>
            <h3>Vagas disponíveis:</h3>
            <p>{numberOfAvailablePositions}</p>
          </div>
        </HotelBox>
      )}
    </>
  );
}

function typesOfAccommodation(rooms) {
  let single;
  let double;
  let triple;

  if (rooms?.length === 0) return '';

  for (let i = 0; i < rooms?.length; i++) {
    if (rooms[i].capacity === 1) {
      single = true;
    }
    if (rooms[i].capacity === 2) {
      double = true;
    }
    if (rooms[i].capacity === 3) {
      triple = true;
    }
  }

  const accommodations = [
    { accommodation: 'Single', contain: single },
    { accommodation: 'Double', contain: double },
    { accommodation: 'Triple', contain: triple },
  ];

  const filterAccommodations = accommodations.filter((item) => item.contain === true);

  const result = filterAccommodations.map((item) => item.accommodation);

  if (result.length === 3) {
    return `${result[0]}, ${result[1]} e ${result[2]}`;
  } else if (result.length === 2) {
    return `${result[0]} e ${result[1]}`;
  } else {
    return `${result[0]}`;
  }
}

export const HotelBox = styled.div`
  background-color: ${(props) => (props.selected ? '#FFEED2' : '#EBEBEB')};
  color: #3c3c3c;
  width: 196px;
  height: 264px;
  padding: 16px 14px 22px 14px;
  border-radius: 10px;
  cursor: pointer;

  :hover {
    background-color: ${(props) => (props.selected ? '#FFEED2' : '#CCCCCC')};
  }

  img {
    width: 168px;
    height: 109px;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  h2 {
    color: #343434;
    font-size: 20px;
    margin-bottom: 10px;
  }

  div {
    margin-bottom: 14px;
    line-height: 14px;

    h3 {
      font-size: 12px;
      font-weight: 700;
    }

    p {
      font-size: 12px;
    }
  }

  @media (max-width: 600px) {
    margin-bottom: 10px !important;
    margin-left: 18vw;
  }
`;

const ChangeRoomButton = styled.button`
  margin-top: 10px !important;
  height: 37px !important;
  width: 182px !important;
  box-shadow: 0px 2px 10px 0px #00000040;
  background: #e0e0e0;
  border: none;
  border-radius: 4px;
  color: #000000;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;

  @media (max-width: 600px) {
    margin-bottom: 10px !important;
  }
`;
