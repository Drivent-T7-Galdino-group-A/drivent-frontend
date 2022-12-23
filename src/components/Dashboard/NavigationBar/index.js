import { Link, useLocation } from 'react-router-dom';

import styled from 'styled-components';

import { FaFileContract, FaMoneyBill, FaBed, FaCalendarWeek, FaCertificate } from 'react-icons/fa';

import NavigationButton from './NavigationButton';
import { useContext } from 'react';
import RoomContext from '../../../contexts/RoomContext';
import useBooking from '../../../hooks/api/useBooking';

export default function NavigationBar() {
  const { setIsRoomSelected } = useContext(RoomContext);
  const { booking } = useBooking();
  const location = useLocation();

  function isActive(buttonPath) {
    return location.pathname === buttonPath;
  }

  function isBooking() {
    if (booking) {
      setIsRoomSelected(true);
    }
  }

  return (
    <Container>
      <Link to="/dashboard/subscription" onClick={isBooking}>
        <NavigationButton active={isActive('/dashboard/subscription')}>
          <FaFileContract />
          <span>Inscrição</span>
        </NavigationButton>
      </Link>

      <Link to="/dashboard/payment" onClick={isBooking}>
        <NavigationButton active={isActive('/dashboard/payment')}>
          <FaMoneyBill />
          <span>Pagamento</span>
        </NavigationButton>
      </Link>

      <Link to="/dashboard/hotel">
        <NavigationButton active={isActive('/dashboard/hotel')}>
          <FaBed />
          <span>Hotel</span>
        </NavigationButton>
      </Link>

      <Link to="/dashboard/activities" onClick={isBooking}>
        <NavigationButton active={isActive('/dashboard/activities')}>
          <FaCalendarWeek />
          <span>Atividades</span>
        </NavigationButton>
      </Link>

      <Link to="/dashboard/certificate" onClick={isBooking}>
        <NavigationButton active={isActive('/dashboard/certificate')}>
          <FaCertificate />
          <span>Certificado</span>
        </NavigationButton>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ddd;
  box-shadow: 2px 0 10px 0 rgba(0, 0, 0, 0.1);
  width: 100px;
  flex-shrink: 0;
  justify-content: flex-start;

  > a {
    text-decoration: none;
  }

  @media (max-width: 600px) {
    width: 100%;
    height: 80px;
    flex-direction: row;
  }
`;
