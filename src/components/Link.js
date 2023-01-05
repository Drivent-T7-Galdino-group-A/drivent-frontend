import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default styled(Link)`
  text-decoration: none;
  color: #222;
  margin-top: ${props => props.margintop ? '30px' : ''};

  &:hover {
    text-decoration: underline;
  }
`;
