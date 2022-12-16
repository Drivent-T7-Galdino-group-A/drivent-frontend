import styled from 'styled-components';

export const TypePresencial = styled.div`
  ${(props) => (props.type === 'Presencial' ? 'background-color: #FFEED2;' : '')}
`;
