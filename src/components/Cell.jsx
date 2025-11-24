import { useSnake } from "../contexts/useSnake";
import { getSnakesLinkDirection } from "../contexts/game/snakesLinkDirection";
import {
  DOWN,
  EMPTY,
  FOOD,
  getOtherSnakesLink,
  LEFT,
  RIGHT,
  SNAKES_BODY,
  SNAKES_HEAD,
  SNAKES_TAIL,
  UP,
} from "../contexts/game/gameFlow";

function Cell({ cellIndex }) {
  const { currentBoardState, snakesHeadIndex } = useSnake();
  const cellState = currentBoardState[cellIndex].cellType;

  const snakesLinkDirection =
    currentBoardState[cellIndex].snakesLink !== null
      ? getSnakesLinkDirection(currentBoardState[cellIndex].snakesLink, cellIndex)
      : null;

  const hideBorderClasses = [];
  if (snakesLinkDirection === UP) {
    hideBorderClasses.push("border-t-0");

    if (cellState === SNAKES_HEAD) hideBorderClasses.push("bg-gradient-to-b from-green-950 to-green-700");
  }
  if (snakesLinkDirection === RIGHT) {
    hideBorderClasses.push("border-r-0");

    if (cellState === SNAKES_HEAD) hideBorderClasses.push("bg-gradient-to-l from-green-950 to-green-700");
  }
  if (snakesLinkDirection === DOWN) {
    hideBorderClasses.push("border-b-0");

    if (cellState === SNAKES_HEAD) hideBorderClasses.push("bg-gradient-to-t from-green-950 to-green-700");
  }
  if (snakesLinkDirection === LEFT) {
    hideBorderClasses.push("border-l-0");

    if (cellState === SNAKES_HEAD) hideBorderClasses.push("bg-gradient-to-r from-green-950 to-green-700");
  }

  const otherSnakesLink =
    cellState === SNAKES_TAIL || cellState === SNAKES_BODY
      ? getOtherSnakesLink(currentBoardState, snakesHeadIndex, cellIndex)
      : null;
  const otherSnakesLinkDirection = otherSnakesLink !== null ? getSnakesLinkDirection(otherSnakesLink, cellIndex) : null;

  if (otherSnakesLinkDirection === UP) hideBorderClasses.push("border-t-0");
  if (otherSnakesLinkDirection === RIGHT) hideBorderClasses.push("border-r-0");
  if (otherSnakesLinkDirection === DOWN) hideBorderClasses.push("border-b-0");
  if (otherSnakesLinkDirection === LEFT) hideBorderClasses.push("border-l-0");

  return (
    <div
      className={`flex-center h-10 w-10 border-2 ${hideBorderClasses.join(" ")} ${cellState === EMPTY && "bg-white"} ${(cellState === SNAKES_BODY || cellState === SNAKES_TAIL) && "bg-green-950"} ${cellState === FOOD && "bg-purple-500"}`}
    />
  );
}

export default Cell;
