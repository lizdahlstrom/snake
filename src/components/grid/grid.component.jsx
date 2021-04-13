import React, { useEffect, useState } from 'react';
import GridCell from '../cell/gridcell.component';
import Snake from '../snake/snake.component';
import { GridBox } from './grid.styles';

const SIZE = 16;

const generateCells = () => {
  const generatedCells = [];

  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      generatedCells.push({ id: `${i}${j}` });
    }
  }

  console.log('wihoo', generatedCells);

  return generatedCells;
};

const Grid = () => {
  // Create a grid with x amount of cells
  // React can keep track of which cells are populated by the snake
  // When the cell is populated it should show a different color than the other cells
  // this can be achieved with css, using a class for the populated cells
  const [cells, setCells] = useState(generateCells());

  return (
    <GridBox size={SIZE}>
      {cells.length > 0 ? cells.map((cell) => <GridCell id={cell.id} />) : 'Hmmm...'}
    </GridBox>
  );
};

export default Grid;
