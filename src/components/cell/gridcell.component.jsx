import React from 'react';
import { Cell } from './gridcell.styles';

const GridCell = ({ x, y, type, gridType }) => {
  return <Cell x={x} y={y} type={type} gridType={gridType}></Cell>;
};

export default GridCell;
