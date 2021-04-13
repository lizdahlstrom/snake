import React from 'react';
import { Cell } from './gridcell.styles';

const GridCell = ({id, type}) => {
  return <Cell id={id} type={type}></Cell>;
};

export default GridCell;
