import { createContext, useCallback, useReducer } from "react";
import { createRandomGame } from "./game/randomGeneration";
import {
  EMPTY,
  FOOD,
  GAME_OVER,
  GAME_PAUSED,
  GAME_RUNNING,
  GAME_WON,
  getForwardsIndex,
  getSnakesHeadIndex,
  moveToEmptyCell,
  moveToFoodCell,
  SNAKES_BODY,
  SNAKES_TAIL,
} from "./game/gameFlow";

const SnakeContext = createContext();

const initialState = {
  currentBoardState: Array(100).fill({ index: 0, cellType: EMPTY, snakesLink: null }),
  snakesHeadIndex: -1,
  snakesLength: -1,
  movementDirection: "",
  gameState: GAME_RUNNING,
};

const lazyInit = function (initState) {
  const newBoard = createRandomGame();

  return {
    ...initState,
    currentBoardState: newBoard,
    snakesHeadIndex: getSnakesHeadIndex(newBoard),
    snakesLength: 2,
  };
};

const reducer = function (state, action) {
  switch (action.type) {
    case "gameplay/setMovementDirection":
      return { ...state, movementDirection: action.payload };
    case "gameplay/moveToEmptyCell":
      return {
        ...state,
        currentBoardState: action.payload.newBoard,
        snakesHeadIndex: action.payload.cellAheadIndex,
      };
    case "gameplay/moveToFoodCell":
      return {
        ...state,
        currentBoardState: action.payload.newBoard,
        snakesHeadIndex: action.payload.cellAheadIndex,
        snakesLength: state.snakesLength + 1,
      };
    case "game/togglePause":
      return { ...state, gameState: state.gameState === GAME_RUNNING ? GAME_PAUSED : GAME_RUNNING };
    case "game/over":
      return { ...state, gameState: GAME_OVER };
    case "game/win":
      return { ...state, gameState: GAME_WON };
    case "game/restart": {
      const newBoard = createRandomGame();

      return {
        ...state,
        currentBoardState: newBoard,
        snakesHeadIndex: getSnakesHeadIndex(newBoard),
        snakesLength: 2,
        movementDirection: "",
        gameState: GAME_RUNNING,
      };
    }
    default:
      throw new Error("Invalid action type for SnakeContext reducer function.");
  }
};

function SnakeProvider({ children }) {
  const [{ currentBoardState, snakesHeadIndex, snakesLength, movementDirection, gameState }, dispatch] = useReducer(
    reducer,
    initialState,
    lazyInit
  );

  const handleMovement = useCallback(
    function (direction) {
      dispatch({ type: "gameplay/setMovementDirection", payload: direction });
      const cellAheadIndex = getForwardsIndex(snakesHeadIndex, direction);

      switch (currentBoardState[cellAheadIndex].cellType) {
        case EMPTY: {
          const newBoard = moveToEmptyCell(currentBoardState, snakesHeadIndex, cellAheadIndex, snakesLength);
          dispatch({ type: "gameplay/moveToEmptyCell", payload: { newBoard, cellAheadIndex } });
          return;
        }
        case FOOD:
          if (snakesLength === 99) dispatch({ type: "game/win" });
          else {
            const newBoard = moveToFoodCell(currentBoardState, snakesHeadIndex, cellAheadIndex, snakesLength);
            if (newBoard) dispatch({ type: "gameplay/moveToFoodCell", payload: { newBoard, cellAheadIndex } });
          }
          return;
        case SNAKES_BODY:
        case SNAKES_TAIL:
          if (currentBoardState[snakesHeadIndex].snakesLink !== cellAheadIndex) dispatch({ type: "game/over" });
          return;
        default:
          throw new Error("Error moving the snake to another cell.");
      }
    },
    [currentBoardState, snakesHeadIndex, snakesLength, dispatch]
  );

  return (
    <SnakeContext.Provider
      value={{
        currentBoardState,
        snakesHeadIndex,
        snakesLength,
        movementDirection,
        gameState,
        handleMovement,
        dispatch,
      }}
    >
      {children}
    </SnakeContext.Provider>
  );
}

export { SnakeProvider, SnakeContext };
