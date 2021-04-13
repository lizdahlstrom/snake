import styled from 'styled-components';

export const GridBox = styled.div`
  background: gray;
  border-radius: 6px;
  width: 20em;
  height: 20em;
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.size}, 1fr)`};
  grid-template-rows: ${(props) => `repeat(${props.size}, 1fr)`};
  grid-gap: 1px;
  border: 1px solid red;
`;
