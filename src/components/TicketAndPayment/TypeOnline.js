import styled from 'styled-components';

export const TypeOnline = styled.div`
  ${(props) => (props.type === 'true' ? 'background-color: #FFEED2;' : '')}
`;
