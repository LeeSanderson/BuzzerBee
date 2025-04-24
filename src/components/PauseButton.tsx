import { RefObject, useState } from "react";
import GameState from "./GameState";
import React from "react";

interface PauseButtonProps {
  gameOver: boolean;
  gameState: RefObject<GameState>;
}

const PauseButton: React.FC<PauseButtonProps> = ({ gameOver, gameState }) => {
  const [isPaused, setIsPaused] = useState(gameState.current.isPaused);
  return (
    <button
      className="char"
      disabled={gameOver}
      onClick={() => {
        gameState.current.togglePaused();
        setIsPaused(!isPaused);
      }}
    >
      {isPaused ? "▶" : "⏸"}
    </button>
  );
};

export default PauseButton;
