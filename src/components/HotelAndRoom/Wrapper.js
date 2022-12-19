import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
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

  > div {
    display: flex;
    flex-direction: column;
    width: 145px;
    height: 145px;
    margin: 0 10px 0 0;
    border: 1px solid #cecece;
    border-radius: 20px;
    font-weight: 400;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #454545;
    margin-right: 25px;
    cursor: pointer;

    h6 {
      margin-top: 3px;
      font-size: 14px;
      color: #898989;
    }
  }

  @media (max-width: 600px) {
    > div {
      width: 40%;
      padding-left: 0px !important;
    }
  }
`;
