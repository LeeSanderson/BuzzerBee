import React, { useRef, useEffect, useState } from "react";
import { checkCollision } from "./collision";
import Bee from "./components/Bee";
import ParallaxBackgound from "./components/ParallaxBackground";
import ObstacleFactory from "./components/ObstacleFactory";
import GameState from "./components/GameState";
import Score from "./components/Score";
import PreStartInstructions from "./components/PreStartInstructions";
import { useEvent } from "./hooks/useEvent";
import GameOverModal from "./components/GameOverModal";
import PauseButton from "./components/PauseButton";
import MuteButton from "./components/MuteButton";
import "./Game.css";

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameOver, setGameOver] = React.useState(false);
  const gameStateRef = useRef<GameState>(new GameState());
  const backgroundRef = useRef<ParallaxBackgound>(new ParallaxBackgound(gameStateRef.current));
  const obstacleFactoryRef = useRef<ObstacleFactory>(new ObstacleFactory(gameStateRef.current));
  const beeRef = useRef<Bee>(new Bee(gameStateRef.current));
  const scoreRef = useRef<Score>(new Score(gameStateRef.current));
  const animationFrameIdRef = useRef<number | null>(null);
  const instructionsRef = useRef<PreStartInstructions>(new PreStartInstructions());
  const [highScore, setHighScore] = useState<number>(parseInt(localStorage.getItem("highScore") || "0", 10));

  const renderPreStart = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    backgroundRef.current.update(canvas);
    beeRef.current.update(canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    backgroundRef.current.draw(context);
    beeRef.current.draw(context);
    instructionsRef.current.draw(context);
    if (beeRef.current.y > canvas.height / 2) {
      beeRef.current.flap();
    }
  };

  const renderActiveGame = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    backgroundRef.current.update(canvas);
    obstacleFactoryRef.current.update(canvas);
    beeRef.current.update(canvas);
    scoreRef.current.update(canvas);

    // Check for collisions
    if (checkCollision(beeRef.current, obstacleFactoryRef.current.obstacles, canvas.height)) {
      gameStateRef.current.setGameOver(true);
      setGameOver(true); // Set local state to trigger React component re-render
      console.log("Game Over", beeRef.current, ...obstacleFactoryRef.current.obstacles);
    }

    // Update score only when bee passes an obstacle
    obstacleFactoryRef.current.obstacles.forEach((obstacle) => {
      if (!obstacle.passed && beeRef.current.x > obstacle.top.x + obstacle.top.width) {
        obstacle.passed = true;
        gameStateRef.current.setScore(gameStateRef.current.score + 1);
      }
    });

    context.clearRect(0, 0, canvas.width, canvas.height);
    backgroundRef.current.draw(context);
    obstacleFactoryRef.current.draw(context);
    beeRef.current.draw(context);
    scoreRef.current.draw(context);
  };

  const renderGameOver = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    backgroundRef.current.draw(context);
    obstacleFactoryRef.current.draw(context);
    beeRef.current.draw(context);
    scoreRef.current.draw(context);
  };

  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    if (gameStateRef.current.isPreStart) {
      renderPreStart(context, canvas);
    } else if (gameStateRef.current.isAlive) {
      renderActiveGame(context, canvas);
    } else {
      renderGameOver(context, canvas);
    }

    animationFrameIdRef.current = requestAnimationFrame(render);
  };

  useEffect(() => {
    render();
    return () => {
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]);

  const resetGame = () => {
    setGameOver(false);
    gameStateRef.current.reset();
    backgroundRef.current.reset();
    obstacleFactoryRef.current.reset();
    beeRef.current.reset();
    scoreRef.current.reset();
    instructionsRef.current.reset();
  };

  useEffect(() => {
    if (gameOver) {
      const currentScore = gameStateRef.current.score;
      if (currentScore > highScore) {
        setHighScore(currentScore);
        localStorage.setItem("highScore", currentScore.toString());
      }
    }
  }, [gameOver, highScore]);

  const handleFlap = () => {
    if (gameStateRef.current.isPreStart) {
      gameStateRef.current.startGame();
    } else if (!gameStateRef.current.isGameOver && !gameStateRef.current.isPaused) {
      beeRef.current.flap();
    }
  };

  useEvent("keydown", (e: KeyboardEvent) => {
    if (e.code === "Space") {
      handleFlap();
      e.preventDefault(); // Prevent default tab behavior
    }
  });

  useEvent("touchstart", handleFlap);
  useEffect(() => {
    const resizeCanvas = () => {
      const aspectRatio = 4 / 3;
      const margin = 46; // px
      const maxWidth = window.innerWidth - margin * 2;
      const maxHeight = window.innerHeight - margin * 2;
      let width = maxWidth;
      let height = maxWidth / aspectRatio;
      if (height > maxHeight) {
        height = maxHeight;
        width = maxHeight * aspectRatio;
      }
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = Math.floor(width);
        canvas.height = Math.floor(height);
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={handleFlap}>
      <div className="game-container">
        <canvas ref={canvasRef} />
        <div className="toolbar">
          <PauseButton gameOver={gameOver} gameState={gameStateRef} />
          <MuteButton />
        </div>
      </div>
      {gameOver && <GameOverModal score={gameStateRef.current.score} highScore={highScore} onPlayAgain={resetGame} />}
    </div>
  );
};

export default Game;
