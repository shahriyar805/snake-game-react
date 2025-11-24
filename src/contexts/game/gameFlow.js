import { createRandomFoodMidgame } from "./randomGeneration";

const EMPTY = "E";
const SNAKES_HEAD = "H";
const SNAKES_BODY = "S";
const SNAKES_TAIL = "T";
const FOOD = "F";

const GAME_RUNNING = "R";
const GAME_PAUSED = "P";
const GAME_OVER = "L";
const GAME_WON = "W";

const UP = "U";
const DOWN = "D";
const LEFT = "L";
const RIGHT = "R";

function getSnakesHeadIndex(board) {
  for (var i = 0; i < 100; i++) if (board[i].cellType === SNAKES_HEAD) return i;

  throw new Error("Random snake is not created yet while trying to get snakesHeadIndex.");
}

// function getSnakesTailIndex(board) {
//   for (var i = 0; i < 100; i++) if (board[i].cellType === SNAKES_TAIL) return i;

//   throw new Error("Random snake is not created yet while trying to get snakesHeadIndex.");
// }

function getForwardsIndex(snakesHeadIndex, direction) {
  switch (direction) {
    case UP:
      return snakesHeadIndex - 10 < 0 ? snakesHeadIndex + 90 : snakesHeadIndex - 10;
    case RIGHT:
      return snakesHeadIndex % 10 === 9 ? snakesHeadIndex - 9 : snakesHeadIndex + 1;
    case DOWN:
      return snakesHeadIndex + 10 > 99 ? snakesHeadIndex - 90 : snakesHeadIndex + 10;
    case LEFT:
      return snakesHeadIndex % 10 === 0 ? snakesHeadIndex + 9 : snakesHeadIndex - 1;
    default:
      throw new Error("Wrong movement direction.");
  }
}

function moveToFoodCell(board, snakesHeadIndex, cellAheadIndex, snakesLength) {
  const newFoodIndex = createRandomFoodMidgame(board, snakesLength);

  if (newFoodIndex)
    return board.map((cell, i) => {
      switch (i) {
        case snakesHeadIndex:
          return { index: i, cellType: SNAKES_BODY, snakesLink: cell.snakesLink };
        case cellAheadIndex:
          return { index: i, cellType: SNAKES_HEAD, snakesLink: snakesHeadIndex };
        case newFoodIndex:
          return { index: i, cellType: FOOD, snakesLink: null };
        default:
          return cell;
      }
    });
  else return null;
}

function moveToEmptyCellLongSnake(board, previousSnakesHeadIndex, forwardsIndex) {
  var newBoard = board.slice();
  newBoard[previousSnakesHeadIndex].cellType = SNAKES_BODY;
  newBoard[forwardsIndex].cellType = SNAKES_HEAD;
  newBoard[forwardsIndex].snakesLink = previousSnakesHeadIndex;

  var currentSnakeIteration = forwardsIndex;
  var nextIndex = newBoard[newBoard[currentSnakeIteration].snakesLink].index;
  // var nextOfNextIndex = newBoard[newBoard[nextIndex].snakesLink].index;

  while (newBoard[currentSnakeIteration].snakesLink !== null) {
    if (newBoard[nextIndex].cellType === SNAKES_TAIL) {
      newBoard[currentSnakeIteration].cellType = SNAKES_TAIL;
      newBoard[currentSnakeIteration].snakesLink = null;
      newBoard[nextIndex].cellType = EMPTY;
      return newBoard;
    }

    currentSnakeIteration = newBoard[currentSnakeIteration].snakesLink;
    nextIndex = newBoard[newBoard[currentSnakeIteration].snakesLink].index;
    // nextOfNextIndex = newBoard[newBoard[nextIndex].snakesLink].index;
  }
}

function moveToEmptyCell(board, previousSnakesHeadIndex, forwardsIndex, snakesLength) {
  if (snakesLength === 2) {
    var newBoard = board.slice();
    const previousTailIndex = newBoard[previousSnakesHeadIndex].snakesLink;
    newBoard[previousTailIndex].cellType = EMPTY;
    newBoard[previousTailIndex].snakesLink = null;

    const newTailIndex = previousSnakesHeadIndex;
    newBoard[newTailIndex].cellType = SNAKES_TAIL;
    newBoard[newTailIndex].snakesLink = null;

    newBoard[forwardsIndex].cellType = SNAKES_HEAD;
    newBoard[forwardsIndex].snakesLink = previousSnakesHeadIndex;

    return newBoard;
  } else if (snakesLength > 2) return moveToEmptyCellLongSnake(board, previousSnakesHeadIndex, forwardsIndex);
  else throw new Error("Board is not yet created when trying to move the snake.");
}

function getOtherSnakesLink(board, snakesHeadIndex, index) {
  if (!(board[index].cellType === SNAKES_TAIL || board[index].cellType === SNAKES_BODY))
    throw new Error("Wrong use of the getOtherSnakesLink function.");

  var currentSnakeIteration = snakesHeadIndex;

  while (board[currentSnakeIteration].snakesLink !== null) {
    if (board[currentSnakeIteration].snakesLink === index) return currentSnakeIteration;

    currentSnakeIteration = board[currentSnakeIteration].snakesLink;
  }

  throw new Error("Something went wrong while trying to get the other snake's link.");
}

export {
  EMPTY,
  SNAKES_HEAD,
  SNAKES_BODY,
  SNAKES_TAIL,
  FOOD,
  GAME_RUNNING,
  GAME_PAUSED,
  GAME_OVER,
  GAME_WON,
  UP,
  DOWN,
  LEFT,
  RIGHT,
  getSnakesHeadIndex,
  // getSnakesTailIndex,
  getForwardsIndex,
  moveToFoodCell,
  moveToEmptyCell,
  getOtherSnakesLink,
};
