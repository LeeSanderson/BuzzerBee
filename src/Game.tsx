import React, { useRef, useEffect } from "react";
import { checkCollision } from "./collision";
import Bee from "./components/Bee";
import ParallaxBackgound from "./components/ParallaxBackground";
import ObstacleFactory from "./components/ObstacleFactory";
import GameState from "./components/GameState";

const initialSpeed = 3;
const speedIncreaseRate = 0.002;

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameStateRef = useRef<GameState>(new GameState());
  const backgroundRef = useRef<ParallaxBackgound>(new ParallaxBackgound(initialSpeed, speedIncreaseRate));
  const obstacleFactoryRef = useRef<ObstacleFactory>(new ObstacleFactory(initialSpeed, speedIncreaseRate));
  const beeRef = useRef<Bee>(new Bee(gameStateRef.current));
  const animationFrameIdRef = useRef<number | null>(null);

  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    if (gameStateRef.current.isAlive) {
      backgroundRef.current.update(canvas);
      obstacleFactoryRef.current.update(canvas);
      beeRef.current.update(canvas);

      // Check for collisions
      if (checkCollision(beeRef.current, obstacleFactoryRef.current.obstacles, canvas.height)) {
        gameStateRef.current.setGameOver(true);
        console.log("Game Over", beeRef.current, ...obstacleFactoryRef.current.obstacles);
      }

      // Update score
      gameStateRef.current.setScore(gameStateRef.current.score + 1);
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    backgroundRef.current.draw(context);
    obstacleFactoryRef.current.draw(context);
    beeRef.current.draw(context);

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
  }, [
    gameStateRef.current.isGameOver,
    gameStateRef.current.score,
    gameStateRef.current.highScore,
    gameStateRef.current.isPaused,
  ]);

  const handleFlap = () => {
    if (!gameStateRef.current.isGameOver && !gameStateRef.current.isPaused) {
      beeRef.current.flap();
    }
  };

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Tab") {
        handleFlap();
        e.preventDefault(); // Prevent default tab behavior
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleTouch = () => {
      handleFlap();
    };
    window.addEventListener("touchstart", handleTouch);
    return () => {
      window.removeEventListener("touchstart", handleTouch);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={handleFlap}>
      <canvas ref={canvasRef} width={800} height={600} />
      {gameStateRef.current.isGameOver && (
        <div>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}
      {!gameStateRef.current.isGameOver && (
        <div>
          <button onClick={() => gameStateRef.current.togglePaused()}>
            {gameStateRef.current.isPaused ? "Resume" : "Pause"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;
