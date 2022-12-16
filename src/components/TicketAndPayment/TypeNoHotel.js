import styled from 'styled-components';

export const TypeNoHotel = styled.div`
  ${(props) => (props.type === 'false' ? 'background-color: #FFEED2;' : '')}
`;
