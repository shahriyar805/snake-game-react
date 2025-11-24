import { useSnake } from "../contexts/useSnake";
import Buttons from "./Buttons";
import Rows from "./Rows";

function GameLayout() {
  const { snakesLength } = useSnake();

  return (
    <div className="space-y-6">
      <Rows />
      <p className="flex-center text-2xl">
        Current Score: <span className="font-bold">{snakesLength}</span>
      </p>
      <Buttons />
    </div>
  );
}

export default GameLayout;
