import styled from 'styled-components';

export const TypePresencial = styled.div`
  ${(props) => (props.type === 'false' ? 'background-color: #FFEED2;' : '')}
`;
