import React, { useEffect, useState } from 'react';
import GridCell from '../cell/gridcell.component';
import Snake from '../snake/snake.component';
import { GridBox } from './grid.styles';
import DIRECTION from '../../datatypes/direction';

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
        type: null,
      });
    }
  }

  return generatedCells;
};

const getRandomPos = () => {
  return Math.floor(Math.random() * 16);
};

const Grid = () => {
  const [cells, setCells] = useState(generateCells());
  const [food, setFood] = useState({
    posX: getRandomPos(),
    posY: getRandomPos(),
  });
  const [snake, setSnake] = useState({
    positions: [
      { x: 8, y: 8 },
      { x: 9, y: 8 },
    ],
    head: { x: 7, y: 8 },
    direction: DIRECTION.LEFT,
  });
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  let timer;
  const [score, setScore] = useState(0);

  const resetGame = () => {
    setCells(generateCells());

    setSnake({
      positions: [
        { x: 8, y: 8 },
        { x: 9, y: 8 },
      ],
      head: { x: 7, y: 8 },
      direction: DIRECTION.LEFT,
    });

    repositionFood();
  };

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
    timer = setTimeout(() => {
      // if food has already a position, then remove the food from the
      // position and then set food to another random pos
      moveSnake();
    }, 200);
    setIsTimerRunning(true);
    return () => clearTimeout(timer);
  });

  const moveSnake = () => {
    let head = snake.head;

    if (head.x === -1 || head.y === -1 || head.x === SIZE || head.y === SIZE)
      return;

    const butt = snake.positions[snake.positions.length - 1];
    const buttIndex = cells.findIndex(
      (cell) => cell.x === butt.x && cell.y === butt.y
    );

    const newHead = { x: head.x, y: head.y };

    switch (snake.direction) {
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
      let message;

      if (score >= 70)
        message = `you fat bastard!\nOk go do something else now, you've had enough.`;
      else if (score <= 15) message = `. Didn't even try did you?`;
      else if (score > 15 && score < 30)
        message =
          '! \nImprovements COULD be made, but hey who am I to say amirite?';
      else if (score >= 30 && score < 45)
        message = '!\nDid you by any chance own a Nokia at some point?';
      else if (score >= 45 && score < 70)
        message = `!\nHmmm... You've probably dabbled with a snake or two before.`;

      window.alert(`Game over${message}\n Your score: ${score}`);
      window.location.reload();
    } else {
      snake.positions.pop();
    }

    snake.positions.push(head);
    snake.positions.unshift(snake.positions.pop());

    snake.head = newHead;

    const clone = [...cells];

    const gridCells = clone.filter((cell) => {
      let match = snake.positions.find(
        (pos) => pos.x === cell.x && pos.x && cell.y === pos.y
      );
      if (match) return match;
    });

    gridCells.push(
      clone.find((cell) => cell.x === snake.head.x && cell.y === snake.head.y)
    );

    gridCells.forEach((gridCell) => {
      gridCell.type = 'snake';
    });

    clone[buttIndex].type = null;

    setCells(clone);
  };

  const repositionFood = () => {
    if (food.posX >= 0 && food.posY >= 0) {
      const index = cells.findIndex(
        (cell) => cell.x === food.posX && cell.y === food.posY
      );
      const clone = [...cells];
      clone[index].type = null;
      setCells(clone);
    }

    let newPos = { posX: getRandomPos(), posY: getRandomPos() };

    while (
      (newPos.posX === food.posX && newPos.posY === food.posY) ||
      snake.positions.filter(
        (pos) => pos.x === newPos.posX && pos.y === newPos.posY
      ).length > 0
    ) {
      newPos = { posX: getRandomPos(), posY: getRandomPos() };
    }
    setFood(newPos);
  };

  useEffect(() => {}, [cells]);

  useEffect(() => {
    const index = cells.findIndex(
      (cell) => cell.x === food.posX && cell.y === food.posY
    );
    const clone = [...cells];
    clone[index].type = 'food';
    setCells(clone);
  }, [food]);

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
