import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;

  h5 {
    width: 100%;
    font-weight: 400;
    font-size: 20px;
    color: #8e8e8e;
    margin-top: 17px;
  }

  @media (max-width: 600px) {
    > div {
      width: 40%;
      padding-left: 0px !important;
    }
  }
`;
