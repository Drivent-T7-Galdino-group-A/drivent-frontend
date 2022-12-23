import styled from 'styled-components';

export const Wrapper = styled.div`
  font-family: 'Roboto';
  width: 100%;
  justify-content: ${props => props.paymentConfirmed !== 'PAID' ? 'center' : ''};
  align-items: ${props => props.paymentConfirmed !== 'PAID' ? 'center' : ''};
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
