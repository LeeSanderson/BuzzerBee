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
      disabled={gameOver}
      onClick={() => {
        gameState.current.togglePaused();
        setIsPaused(!isPaused);
      }}
    >
      {isPaused ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}
    </button>
  );
};

export default PauseButton;
