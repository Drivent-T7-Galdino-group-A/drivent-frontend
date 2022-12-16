import styled from 'styled-components';

export const TypeOnline = styled.div`
  ${(props) => (props.type === 'Online' ? 'background-color: #FFEED2;' : '')}
`;
