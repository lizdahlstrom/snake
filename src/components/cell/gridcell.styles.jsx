import styled from 'styled-components';

const colorScheme = {
  violet: '#cc99ff',
  blue: '#a9d1f7',
  green: '#b4f0a7',
  yellow: '#ffffbf',
  orange: '#ffdfbe',
  red: '#ffb1b0',
};

export const Cell = styled.p`
  background: ${(props) => {
    if (props.type === 'snake') return colorScheme.blue;
    if (props.type === 'head') return 'indigo';
    if (props.type === 'food') return colorScheme.red;
    if (props.gridType === 'even') return colorScheme.green;
    return colorScheme.yellow;
  }};
  padding: 0px;
  margin: 0px;
  max-width: 100%;
  min-width: 0;
`;
