import React from "react";
import beeCrash from "../assets/bee-crash.png";
import "./GameOverModal.css";

interface GameOverModalProps {
  score: number;
  highScore: number;
  onPlayAgain: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ score, highScore, onPlayAgain }) => {
  return (
    <div className="game-over-modal">
      <img src={beeCrash} alt="Bee crashing into an obstacle" className="game-over-image" />
      <h2>Game Over</h2>
      <p>Your Score: {score}</p>
      <p>High Score: {highScore}</p>
      {score >= highScore ? <p>Congratulations! You achieved a new high score!</p> : <p>Better luck next time!</p>}
      <button onClick={onPlayAgain}>Play Again</button>
    </div>
  );
};

export default GameOverModal;
