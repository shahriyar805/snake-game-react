import { useCallback, useEffect, useRef } from "react";
import { BiCaretDown, BiCaretLeft, BiCaretRight, BiCaretUp } from "react-icons/bi";
import { FaPause, FaPlay } from "react-icons/fa6";
import { useSnake } from "../contexts/useSnake";
import { DOWN, GAME_PAUSED, GAME_RUNNING, LEFT, RIGHT, UP } from "../contexts/game/gameFlow";

function Buttons() {
  const { movementDirection, handleMovement, gameState, dispatch } = useSnake();
  const intervalRef = useRef(null);

  useEffect(
    function () {
      const handleKeydown = function (e) {
        if (gameState === GAME_RUNNING) {
          if (e.key === "ArrowUp") handleMovement(UP);
          if (e.key === "ArrowDown") handleMovement(DOWN);
          if (e.key === "ArrowLeft") handleMovement(LEFT);
          if (e.key === "ArrowRight") handleMovement(RIGHT);
        }
        if (e.key === " ") dispatch({ type: "game/togglePause" });
      };

      window.addEventListener("keydown", handleKeydown);
      return () => window.removeEventListener("keydown", handleKeydown);
    },
    [handleMovement, gameState, dispatch]
  );

  const startTimer = useCallback(
    function () {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      if (movementDirection) intervalRef.current = setInterval(() => handleMovement(movementDirection), 500);
    },
    [intervalRef, movementDirection, handleMovement]
  );
  useEffect(
    function () {
      if (gameState === GAME_PAUSED) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } else if (gameState === GAME_RUNNING) {
        startTimer();

        return function () {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        };
      }
    },
    [startTimer, gameState]
  );

  return (
    <div className="flex-center flex-col">
      <div className="mb-8 flex flex-col items-center">
        <button
          className="movement-button mb-1"
          onClick={() => handleMovement(UP)}
          disabled={gameState === GAME_PAUSED}
        >
          <BiCaretUp />
        </button>
        <div className="flex items-center gap-1">
          <button className="movement-button" onClick={() => handleMovement(LEFT)} disabled={gameState === GAME_PAUSED}>
            <BiCaretLeft />
          </button>
          <button
            className="flex-center h-12 w-12 rounded-2xl bg-gray-500 text-2xl"
            onClick={() => dispatch({ type: "game/togglePause" })}
          >
            {gameState === GAME_RUNNING ? <FaPause /> : <FaPlay />}
          </button>
          <button
            className="movement-button"
            onClick={() => handleMovement(RIGHT)}
            disabled={gameState === GAME_PAUSED}
          >
            <BiCaretRight />
          </button>
        </div>
        <button
          className="movement-button mt-1"
          onClick={() => handleMovement(DOWN)}
          disabled={gameState === GAME_PAUSED}
        >
          <BiCaretDown />
        </button>
      </div>
    </div>
  );
}

export default Buttons;
