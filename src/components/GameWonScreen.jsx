import { useSnake } from "../contexts/useSnake";

function GameWonScreen() {
  const { dispatch } = useSnake();

  return (
    <div className="flex-center mt-32 flex-col gap-y-20">
      <h1 className="text-6xl font-bold uppercase text-green-600">CONGRATS, YOU WON</h1>
      <button
        className="flex-center rounded-2xl bg-gray-700 p-3 text-2xl font-bold uppercase text-white"
        onClick={() => dispatch({ type: "game/restart" })}
      >
        restart
      </button>
    </div>
  );
}

export default GameWonScreen;
