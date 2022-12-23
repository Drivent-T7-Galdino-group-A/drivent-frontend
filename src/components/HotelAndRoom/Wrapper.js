import styled from 'styled-components';

export const Wrapper = styled.div`
  font-family: 'Roboto';
  display: ${(props) => (props.paymentConfirmed !== 'PAID' ? 'flex' : '')};
  width: 100%;
  height: 90%;
  display: ${(props) => (props.paymentConfirmed === 'PAID' && props.includesHotel ? '' : 'flex')};
  justify-content: ${(props) => (props.paymentConfirmed === 'PAID' && props.includesHotel ? '' : 'center')};
  align-items: ${(props) => (props.paymentConfirmed === 'PAID' && props.includesHotel ? '' : 'center')};
  flex-wrap: wrap;

  h5 {
    width: 100%;
    font-weight: 400;
    font-size: 20px;
    color: #8e8e8e;
    margin-top: 17px;
  }

  span {
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 600px) {
    > div {
      width: 40%;
      padding-left: 0px !important;
    }
  }
`;
