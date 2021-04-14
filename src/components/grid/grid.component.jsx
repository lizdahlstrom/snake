import React, { useContext, useEffect, useState } from 'react';
import GridCell from '../cell/gridcell.component';
import Snake from '../snake/snake.component';
import { GridBox } from './grid.styles';
import DIRECTION from '../../datatypes/direction';
import { ScoreContext } from '../../contexts/score.context';

const SIZE = 16;

const generateCells = () => {
  const generatedCells = [];

  for (let x = 0; x < SIZE; x++) {
    for (let y = 0; y < SIZE; y++) {
      const isEven = (x + y) % 2 === 0 ? false : true;
      generatedCells.push({
        x,
        y,
        gridType: isEven ? 'even' : 'odd',
      });
    }
  }

  return generatedCells;
};

const getRandomPos = () => Math.floor(Math.random() * SIZE);

const initalSnakeState = {
  positions: [
    { x: 8, y: 8 },
    { x: 9, y: 8 },
  ],
  head: { x: 7, y: 8 },
  direction: DIRECTION.TOP,
};

const Grid = () => {
  const [cells, setCells] = useState(generateCells());
  const [food, setFood] = useState({
    posX: getRandomPos(),
    posY: getRandomPos(),
  });
  const [snake, setSnake] = useState(initalSnakeState);
  const [score, setScore] = useContext(ScoreContext);

  const resetGame = () => {
    setCells(generateCells());
    setSnake(initalSnakeState);
    repositionFood();
  };

  // on load effect, event listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          if (snake.direction === DIRECTION.BOTTOM) return;
          snake.direction = DIRECTION.TOP;
          break;
        case 'ArrowDown':
        case 's':
          if (snake.direction === DIRECTION.TOP) return;
          snake.direction = DIRECTION.BOTTOM;
          break;
        case 'ArrowLeft':
        case 'a':
          if (snake.direction === DIRECTION.RIGHT) return;
          snake.direction = DIRECTION.LEFT;
          break;
        case 'ArrowRight':
        case 'd':
          if (snake.direction === DIRECTION.LEFT) return;
          snake.direction = DIRECTION.RIGHT;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // timer used for snake movement
  useEffect(() => {
    const timer = setTimeout(() => {
      moveSnake(snake.direction);
    }, 200);
    return () => clearTimeout(timer);
  });

  const moveSnake = (direction) => {
    let head = snake.head;

    const butt = snake.positions[snake.positions.length - 1];
    const buttIndex = cells.findIndex(
      (cell) => cell.x === butt.x && cell.y === butt.y
    );
    cells[buttIndex].type = null;

    const newHead = { ...head };

    switch (direction) {
      case DIRECTION.TOP:
        newHead.x = head.x - 1;
        break;
      case DIRECTION.RIGHT:
        newHead.y = head.y + 1;
        break;
      case DIRECTION.BOTTOM:
        newHead.x = head.x + 1;
        break;
      case DIRECTION.LEFT:
        newHead.y = head.y - 1;
        break;
    }

    // check collision
    if (newHead.x === food.posX && newHead.y === food.posY) {
      setScore(score + 1);
      repositionFood();
    } else if (
      snake.positions.filter(
        (pos) => pos.x === newHead.x && pos.y === newHead.y
      ).length > 0 ||
      newHead.x === SIZE ||
      newHead.y === SIZE ||
      newHead.x === -1 ||
      newHead.y === -1
    ) {
      window.alert(`Game over${endMessage(score)}\n Your score: ${score}`);
      window.location.reload();
    } else {
      // remove old butt
      snake.positions.pop();
    }

    snake.positions.push(head);
    snake.positions.unshift(snake.positions.pop());
    snake.head = newHead;

    const gridCells = cells.filter((cell) => {
      let match = snake.positions.find(
        (pos) => pos.x === cell.x && pos.x && cell.y === pos.y
      );
      if (match) return match;
    });

    gridCells.push(
      cells.find((cell) => cell.x === snake.head.x && cell.y === snake.head.y)
    );

    gridCells.forEach((gridCell) => {
      gridCell.type = 'snake';
    });

    setCells([...cells]);
  };

  // Draw food on grid when position is updated
  useEffect(() => {
    const index = cells.findIndex(
      (cell) => cell.x === food.posX && cell.y === food.posY
    );
    const clone = [...cells];
    clone[index].type = 'food';
    setCells(clone);
  }, [food]);

  /**
   * Place food on grid
   */
  const repositionFood = () => {
    // remove existing food
    if (food.posX >= 0 && food.posY >= 0) {
      const index = cells.findIndex(
        (cell) => cell.x === food.posX && cell.y === food.posY
      );
      cells[index].type = null;
    }

    // generate a new position for food
    let newPos = { posX: getRandomPos(), posY: getRandomPos() };

    while (isCellPopulated(newPos)) {
      newPos = { posX: getRandomPos(), posY: getRandomPos() };
    }

    setFood(newPos);
  };

  /**
   * Check if cell position is populated
   *
   * @param {Object} cell contains posX and posY props
   * @returns {Boolean}
   */
  const isCellPopulated = (cell) => {
    return (
      (cell.posX === food.posX && cell.posY === food.posY) ||
      snake.positions.filter(
        (pos) => pos.x === cell.posX && pos.y === cell.posY
      ).length > 0
    );
  };

  /**
   * Generates end message based on current score
   *
   * @param {Number} endScore
   * @returns {String}
   */
  const endMessage = (endScore) => {
    let message = '';

    if (endScore >= 75)
      message = ` snake charmer.\nOk go do something else, you've had enough.`;
    else if (endScore <= 15) message = `. Didn't even try did you?`;
    else if (endScore > 15 && endScore < 30)
      message =
        '! \nImprovements COULD be made, but hey who am I to say amirite?';
    else if (endScore >= 30 && endScore < 45)
      message = '!\nDid you by any chance own a Nokia at some point?';
    else if (endScore >= 45 && endScore < 60)
      message = `!\nYou've probably dabbled with a snake or two before. He-he.`;
    else if (endScore >= 60 && endScore < 75)
      message = `!\nHoly crap that's a big snake!`;

    return message;
  };

  return (
    <GridBox size={SIZE}>
      {cells.length > 0
        ? cells.map((cell) => (
            <GridCell
              key={`${cell.x}x${cell.y}`}
              x={cell.x}
              y={cell.y}
              type={cell.type}
              gridType={cell.gridType}
            />
          ))
        : 'Hmmm...'}
    </GridBox>
  );
};

export default Grid;
