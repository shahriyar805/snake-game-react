import { EMPTY, FOOD, SNAKES_HEAD, SNAKES_TAIL } from "./gameFlow";

function createRandomSnakeCorners(headIndex) {
  var tailIndex;
  const rand = Math.floor(Math.random() * 2);

  switch (headIndex) {
    case 0:
      tailIndex = rand === 0 ? 1 : 10;
      break;
    case 9:
      tailIndex = rand === 0 ? 8 : 19;
      break;
    case 90:
      tailIndex = rand === 0 ? 80 : 91;
      break;
    case 99:
      tailIndex = rand === 0 ? 89 : 98;
      break;
    default:
      throw new Error("There was a problem creating random snake in the corners.");
  }

  return { headIndex, tailIndex };
}

function createRandomSnakeTopEdge(headIndex, rand) {
  var tailIndex;

  switch (rand) {
    case 0:
      tailIndex = headIndex - 1;
      break;
    case 1:
      tailIndex = headIndex + 1;
      break;
    case 2:
      tailIndex = headIndex + 10;
      break;
    default:
      throw new Error("There was a problem generating the tail of the random snake in the edges.");
  }

  return { headIndex, tailIndex };
}

function createRandomSnakeBottomEdge(headIndex, rand) {
  var tailIndex;

  switch (rand) {
    case 0:
      tailIndex = headIndex - 10;
      break;
    case 1:
      tailIndex = headIndex - 1;
      break;
    case 2:
      tailIndex = headIndex + 1;
      break;
    default:
      throw new Error("There was a problem generating the tail of the random snake in the edges.");
  }

  return { headIndex, tailIndex };
}

function createRandomSnakeLeftEdge(headIndex, rand) {
  var tailIndex;

  switch (rand) {
    case 0:
      tailIndex = headIndex - 10;
      break;
    case 1:
      tailIndex = headIndex + 1;
      break;
    case 2:
      tailIndex = headIndex + 10;
      break;
    default:
      throw new Error("There was a problem generating the tail of the random snake in the edges.");
  }

  return { headIndex, tailIndex };
}

function createRandomSnakeRightEdge(headIndex, rand) {
  var tailIndex;

  switch (rand) {
    case 0:
      tailIndex = headIndex - 10;
      break;
    case 1:
      tailIndex = headIndex - 1;
      break;
    case 2:
      tailIndex = headIndex + 10;
      break;
    default:
      throw new Error("There was a problem generating the tail of the random snake in the right edge.");
  }

  return { headIndex, tailIndex };
}

function createRandomSnakeEdges(headIndex) {
  if (headIndex === 0 || headIndex === 9 || headIndex === 90 || headIndex === 99)
    return createRandomSnakeCorners(headIndex);

  const rand = Math.floor(Math.random() * 3);

  if (Math.floor(headIndex / 10) === 0) return createRandomSnakeTopEdge(headIndex, rand);
  else if (Math.floor(headIndex / 10) === 9) return createRandomSnakeBottomEdge(headIndex, rand);
  else if (headIndex % 10 === 0) return createRandomSnakeLeftEdge(headIndex, rand);
  else if (headIndex % 10 === 9) return createRandomSnakeRightEdge(headIndex, rand);
  else throw new Error("There was a problem creating a random snake in the edges.");
}

function createRandomSnakeMiddle(headIndex) {
  const rand = Math.floor(Math.random() * 4);
  var tailIndex;

  switch (rand) {
    case 0:
      tailIndex = headIndex - 10;
      break;
    case 1:
      tailIndex = headIndex - 1;
      break;
    case 2:
      tailIndex = headIndex + 1;
      break;
    case 3:
      tailIndex = headIndex + 10;
      break;
    default:
      throw new Error("There was a problem creating random snake in the inner cells.");
  }

  return { headIndex, tailIndex };
}

function createRandomSnake() {
  const headIndex = Math.floor(Math.random() * 100);

  if (
    Math.floor(headIndex / 10) === 0 ||
    Math.floor(headIndex / 10) === 9 ||
    headIndex % 10 === 0 ||
    headIndex % 10 === 9
  )
    return createRandomSnakeEdges(headIndex);
  else return createRandomSnakeMiddle(headIndex);
}

function createRandomFood(headIndex, tailIndex) {
  const rand = Math.floor(Math.random() * 98);
  var foodIndex;

  if (rand === tailIndex || rand === headIndex) foodIndex = rand + 2;
  else foodIndex = rand;

  return foodIndex;
}

function createRandomGame() {
  var { headIndex, tailIndex } = createRandomSnake();
  var foodIndex = createRandomFood(headIndex, tailIndex);
  var finalBoard = [];

  for (var i = 0; i < 100; i++) {
    var boardObject = { index: i, cellType: EMPTY, snakesLink: null };

    switch (i) {
      case foodIndex:
      case tailIndex:
        boardObject.cellType = i === foodIndex ? FOOD : SNAKES_TAIL;
        break;
      case headIndex:
        boardObject.cellType = SNAKES_HEAD;
        boardObject.snakesLink = tailIndex;
        break;
    }

    finalBoard.push(boardObject);
  }

  return finalBoard;
}

function createRandomFoodMidgame(board, snakesLength) {
  try {
    const rand = Math.floor(Math.random() * (100 - snakesLength));
    var emptyCells = [];

    for (var i = 0; i < 100; i++) if (board[i].cellType === EMPTY) emptyCells.push(board[i]);

    const newFoodIndex = emptyCells[rand].index;
    return newFoodIndex;
  } catch (e) {
    return null;
  }
}

export { createRandomGame, createRandomFoodMidgame };
