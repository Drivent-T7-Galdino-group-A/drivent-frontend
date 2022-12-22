import styled from 'styled-components';

export const Wrapper = styled.div`
  display: ${(props) => (props.paymentStatus === 'PAID' && !props.isRemote ? '' : 'center')};
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

  span {
    justify-content: center;
    align-items: center;
    color: #8e8e8e;
    font-size: 20px;
    text-align: center;
    width: 411px;
    height: 46px;
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
