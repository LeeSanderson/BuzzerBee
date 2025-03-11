import React, { useRef, useEffect, useState } from "react";
import { checkCollision } from "./collision";
import Bee from "./components/Bee";
import ParallaxBackgound from "./components/ParallaxBackground";
import ObstacleFactory from "./components/ObstacleFactory";

const initialSpeed = 3;
const speedIncreaseRate = 0.002;

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score] = useState(0);
  const scoreRef = useRef(score);
  const [highScore, setHighScore] = useState(() => Number(localStorage.getItem("highScore")) || 0);
  const [isPaused, setIsPaused] = useState(false);

  const backgroundRef = useRef<ParallaxBackgound>(new ParallaxBackgound(initialSpeed, speedIncreaseRate));
  const obstacleFactoryRef = useRef<ObstacleFactory>(new ObstacleFactory(initialSpeed, speedIncreaseRate));
  const beeRef = useRef<Bee>(new Bee());

  const animationFrameIdRef = useRef<number | null>(null);

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const doUpdate = !isGameOver && !isPaused;
    if (doUpdate) {
      backgroundRef.current.update(canvas);
      obstacleFactoryRef.current.update(canvas);
      beeRef.current.update(canvas);

      // Check for collisions
      if (checkCollision(beeRef.current, obstacleFactoryRef.current.obstacles, canvas.height)) {
        setIsGameOver(true);
        console.log("Game Over", beeRef.current, ...obstacleFactoryRef.current.obstacles);
        if (scoreRef.current > highScore) {
          localStorage.setItem("highScore", scoreRef.current.toString());
          setHighScore(scoreRef.current);
        }
      }

      // Update score
      scoreRef.current += 1;
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
  }, [isGameOver, score, highScore, isPaused]);

  const handleFlap = () => {
    if (!isGameOver && !isPaused) {
      beeRef.current.flap();
    }
  };

  useEffect(() => {
    const handleSpacebar = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        handleFlap();
      }
    };
    window.addEventListener("keydown", handleSpacebar);
    return () => {
      window.removeEventListener("keydown", handleSpacebar);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={handleFlap}>
      <canvas ref={canvasRef} width={800} height={600} />
      {isGameOver && (
        <div>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}
      {!isGameOver && (
        <div>
          <button onClick={togglePause}>{isPaused ? "Resume" : "Pause"}</button>
        </div>
      )}
    </div>
  );
};

export default Game;
