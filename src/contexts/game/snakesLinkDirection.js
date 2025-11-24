import { DOWN, LEFT, RIGHT, UP } from "./gameFlow";

function getSnakesLinkDirectionTopLeftCorner(snakesLink) {
  switch (snakesLink) {
    case 1:
      return RIGHT;
    case 10:
      return DOWN;
    case 90:
      return UP;
    case 9:
      return LEFT;
    default:
      throw new Error("Wrong index while trying to get snake's link direction in the top left corner.");
  }
}

function getSnakesLinkDirectionTopRightCorner(snakesLink) {
  switch (snakesLink) {
    case 0:
      return RIGHT;
    case 19:
      return DOWN;
    case 99:
      return UP;
    case 8:
      return LEFT;
    default:
      throw new Error("Wrong index while trying to get snake's link direction in the top right corner.");
  }
}

function getSnakesLinkDirectionBottomLeftCorner(snakesLink) {
  switch (snakesLink) {
    case 91:
      return RIGHT;
    case 0:
      return DOWN;
    case 80:
      return UP;
    case 99:
      return LEFT;
    default:
      throw new Error("Wrong index while trying to get snake's link direction in the bottom left corner.");
  }
}

function getSnakesLinkDirectionBottomRightCorner(snakesLink) {
  switch (snakesLink) {
    case 90:
      return RIGHT;
    case 9:
      return DOWN;
    case 89:
      return UP;
    case 98:
      return LEFT;
    default:
      throw new Error("Wrong index while trying to get snake's link direction in the bottom right corner.");
  }
}

function getSnakesLinkDirectionCorners(snakesLink, index) {
  switch (index) {
    case 0:
      return getSnakesLinkDirectionTopLeftCorner(snakesLink);
    case 9:
      return getSnakesLinkDirectionTopRightCorner(snakesLink);
    case 90:
      return getSnakesLinkDirectionBottomLeftCorner(snakesLink);
    case 99:
      return getSnakesLinkDirectionBottomRightCorner(snakesLink);
    default:
      throw new Error("Wrong index while trying to get snake's link direction in the corners.");
  }
}

function getSnakesLinkDirectionTopEdge(snakesLink, index) {
  switch (snakesLink) {
    case index + 90:
      return UP;
    case index - 1:
      return LEFT;
    case index + 1:
      return RIGHT;
    case index + 10:
      return DOWN;
    default:
      throw new Error("Wrong index while trying to get snake's link direction in the top edge.");
  }
}

function getSnakesLinkDirectionRightEdge(snakesLink, index) {
  switch (snakesLink) {
    case index - 10:
      return UP;
    case index - 1:
      return LEFT;
    case index - 9:
      return RIGHT;
    case index + 10:
      return DOWN;
    default:
      throw new Error("Wrong index while trying to get snake's link direction in the right edge.");
  }
}

function getSnakesLinkDirectionBottomEdge(snakesLink, index) {
  switch (snakesLink) {
    case index - 10:
      return UP;
    case index - 1:
      return LEFT;
    case index + 1:
      return RIGHT;
    case index - 90:
      return DOWN;
    default:
      throw new Error("Wrong index while trying to get snake's link direction in the bottom edge.");
  }
}

function getSnakesLinkDirectionLeftEdge(snakesLink, index) {
  switch (snakesLink) {
    case index - 10:
      return UP;
    case index + 9:
      return LEFT;
    case index + 1:
      return RIGHT;
    case index + 10:
      return DOWN;
    default:
      throw new Error("Wrong index while trying to get snake's link direction in the left edge.");
  }
}

function getSnakesLinkDirectionEdges(snakesLink, index) {
  if (index === 0 || index === 9 || index === 90 || index === 99)
    return getSnakesLinkDirectionCorners(snakesLink, index);
  else if (Math.floor(index / 10) === 0) return getSnakesLinkDirectionTopEdge(snakesLink, index);
  else if (index % 10 === 9) return getSnakesLinkDirectionRightEdge(snakesLink, index);
  else if (Math.floor(index / 10) === 9) return getSnakesLinkDirectionBottomEdge(snakesLink, index);
  else if (index % 10 === 0) return getSnakesLinkDirectionLeftEdge(snakesLink, index);
  else throw new Error("Wrong index while trying to get snake's link direction in the edges.");
}

function getSnakesLinkDirectionMiddle(snakesLink, index) {
  switch (snakesLink) {
    case index - 10:
      return UP;
    case index - 1:
      return LEFT;
    case index + 1:
      return RIGHT;
    case index + 10:
      return DOWN;
    default:
      throw new Error("Wrong index while trying to get snake's link direction in the middle.");
  }
}

function getSnakesLinkDirection(snakesLink, index) {
  if (snakesLink === null)
    throw new Error("Error trying to get snake's link direction from a cell without snake's head or snake's body.");

  if (Math.floor(index / 10) === 0 || Math.floor(index / 10) === 9 || index % 10 === 0 || index % 10 === 9)
    return getSnakesLinkDirectionEdges(snakesLink, index);
  else return getSnakesLinkDirectionMiddle(snakesLink, index);
}

export { getSnakesLinkDirection };
