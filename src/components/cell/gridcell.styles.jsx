import styled from 'styled-components';

export const Cell = styled.p`
  background: ${(props) => {
    if (props.snake) return 'darkslateblue';
    if (props.head) return 'indigo';
    if (props.even) return 'gray';
    return 'lightgray';
}};
  padding: 0;
  margin: 0;
  max-width: 100%;
  min-width: 0;
`;
