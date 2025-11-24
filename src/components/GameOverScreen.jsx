import { useSnake } from "../contexts/useSnake";

function GameOverScreen() {
  const { snakesLength, dispatch } = useSnake();

  return (
    <div className="flex-center mt-32 flex-col gap-y-10">
      <h1 className="text-6xl font-bold uppercase text-red-600">YOU LOST</h1>
      <p className="text-2xl">
        You Scored <span className="font-bold">{snakesLength}</span> Out of <span className="font-bold">100</span>
      </p>
      <button
        className="flex-center rounded-2xl bg-gray-700 p-3 text-2xl font-bold uppercase text-white"
        onClick={() => dispatch({ type: "game/restart" })}
      >
        restart
      </button>
    </div>
  );
}

export default GameOverScreen;
