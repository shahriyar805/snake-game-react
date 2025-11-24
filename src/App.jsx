import GameLayout from "./components/GameLayout";
import GameOverScreen from "./components/GameOverScreen";
import GameWonScreen from "./components/GameWonScreen";
import StyledApp from "./components/StyledApp";
import { GAME_OVER, GAME_PAUSED, GAME_RUNNING, GAME_WON } from "./contexts/game/gameFlow";
import { useSnake } from "./contexts/useSnake";

function App() {
  const { gameState } = useSnake();

  return (
    <StyledApp>
      {(gameState === GAME_RUNNING || gameState === GAME_PAUSED) && <GameLayout />}
      {gameState === GAME_OVER && <GameOverScreen />}
      {gameState === GAME_WON && <GameWonScreen />}
    </StyledApp>
  );
}

export default App;
