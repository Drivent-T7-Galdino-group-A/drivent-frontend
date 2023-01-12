import styled from 'styled-components';

export const Wrapper = styled.div`
  display: ${(props) => (props.paymentStatus === 'PAID' && !props.isRemote ? '' : 'flex')};
  width: 100%;
  height: 90%;
  justify-content: ${(props) => (props.paymentStatus === 'PAID' && !props.isRemote ? '' : 'center')};
  align-items: ${(props) => (props.paymentStatus === 'PAID' && !props.isRemote ? '' : 'center')};
  flex-wrap: wrap;
  font-family: 'Roboto';

  h5 {
    width: 100%;
    font-weight: 400;
    font-size: 20px;
    color: #8e8e8e;
    margin-top: 17px;
  }

  h6 {
    margin-top: 3px;
    font-size: 17px;
    font-weight: 400;
    text-align: center;
    color: #7B7B7B;
  }

  span {
    color: #8e8e8e;
    font-size: 20px;
    text-align: center;
    width: 411px;
    height: 46px;
  }

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    height: auto;

    h5{
      font-size: 22px !important;
      height: 50px;
    }

    h6{
      font-size: 22px !important;
    }
  }
`;
