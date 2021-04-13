import styled from 'styled-components';

const colorScheme = {
  violet: '#cc99ff',
  blue: '#a9d1f7',
  green: '#b4f0a7',
  yellow: '#ffffbf',
  orange: '#ffdfbe',
  red: '#ffb1b0',
};

export const GridBox = styled.div`
  background: white;
  border-radius: 6px;
  width: 20em;
  height: 20em;
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.size}, 1fr)`};
  grid-template-rows: ${(props) => `repeat(${props.size}, 1fr)`};
  border: 1px solid darkslateblue;
`;
