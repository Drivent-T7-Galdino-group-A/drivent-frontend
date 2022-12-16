import styled from 'styled-components';

export const TypeHotel = styled.div`
  ${(props) => (props.type === 'true' ? 'background-color: #FFEED2;' : '')}
`;
