import { useContext } from "react";
import { SnakeContext } from "./SnakeContext";

function useSnake() {
  const contextValue = useContext(SnakeContext);

  if (contextValue === undefined) throw new Error("SnakeContext was used outside the SnakeProvider.");

  return contextValue;
}

export { useSnake };
