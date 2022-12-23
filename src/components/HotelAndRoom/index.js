import styled from 'styled-components';
import useTicket from '../../hooks/api/useTicket';
import { StyledTypography } from '../TicketAndPayment';
import { Wrapper } from './Wrapper';
import MenuHotel from './MenuHotel';
import { useState } from 'react';
import MenuRoom from './MenuRoom';
import useBooking from '../../hooks/api/useBooking';
import { useContext } from 'react';
import RoomContext from '../../contexts/RoomContext';

export default function HotelAndRoom() {
  const [selectedHotel, setSelectedHotel] = useState(0);
  const [rooms, setRooms] = useState([]);
  const { isRoomSelected } = useContext(RoomContext);
  const [selectedRoom, setSelectedRoom] = useState(0);
  const { booking } = useBooking();
  const { ticket } = useTicket();

  function selectHotelHandler(hotel) {
    if (hotel.id === selectedHotel) {
      setSelectedHotel(0);
      setRooms([]);
    } else {
      setSelectedHotel(hotel.id);
      setRooms(hotel.Rooms);
    }
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      <Wrapper paymentConfirmed={ticket?.status} includesHotel={ticket?.TicketType.includesHotel}>
        {ticket?.status === 'PAID' ? (
          ticket?.TicketType.includesHotel ? (
            isRoomSelected ? (
              <>
                <MenuTitle>Você já escolheu seu quarto:</MenuTitle>
                <MenuHotel
                  selectedHotel={selectedHotel}
                  setSelectedHotel={setSelectedHotel}
                  selectHotelHandler={selectHotelHandler}
                  booking={booking}
                  selectedRoom={selectedRoom}
                />
              </>
            ) : (
              <>
                <MenuTitle>Primeiro, escolha seu hotel</MenuTitle>
                <MenuHotel
                  selectedHotel={selectedHotel}
                  setSelectedHotel={setSelectedHotel}
                  selectHotelHandler={selectHotelHandler}
                  selectedRoom={selectedRoom}
                />
                {selectedHotel === 0 ? (
                  <></>
                ) : (
                  <>
                    <MenuTitle>Ótima pedida! Agora escolha seu quarto:</MenuTitle>
                    <MenuRoom
                      rooms={rooms}
                      booking={booking}
                      selectedRoom={selectedRoom}
                      setSelectedRoom={setSelectedRoom}
                    />
                  </>
                )}
              </>
            )
          ) : (
            <WarningMessage>
              Sua modalidade de ingresso não inclui hospedagem. Prossiga para a escolha de atividades
            </WarningMessage>
          )
        ) : (
          <WarningMessage>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</WarningMessage>
        )}
      </Wrapper>
    </>
  );
}

export const WarningMessage = styled.span`
  color: #8e8e8e;
  font-family: 'Roboto';
  font-size: 20px;
  text-align: center;
  width: 411px;
  height: 46px;
`;

export const MenuTitle = styled.h2`
  color: #8e8e8e;
  font-family: 'Roboto';
  font-size: 20px;
  margin: 15px 0 20px 0;
`;

export const HotelContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 19px;
`;

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
`;
