import React, { useRef, useEffect, useState } from "react";
import { checkCollision, collidesWithRect } from "./collision";
import { Obstacle, Rect } from "./types";
import Bee from "./components/Bee";
import ParalaxBackgound from "./components/ParalaxBackground";

const Game: React.FC = () => {
  const initialSpeed = 3;
  const speedIncreaseRate = 0.002;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score] = useState(0);
  const scoreRef = useRef(score);
  const [highScore, setHighScore] = useState(() => Number(localStorage.getItem("highScore")) || 0);
  const [obstacles] = useState<Obstacle[]>([]);
  const obstaclesRef = useRef(obstacles);
  const [isPaused, setIsPaused] = useState(false);
  const backgroundRef = useRef<ParalaxBackgound>(new ParalaxBackgound(initialSpeed, speedIncreaseRate));
  const beeRef = useRef<Bee>(new Bee());

  const animationFrameIdRef = useRef<number | null>(null);
  const initialGapSize = 200;
  const gapReductionRate = 0.9999;

  let gapSize = initialGapSize;
  let speed = initialSpeed;

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const updateObstacles = (canvas: HTMLCanvasElement) => {
    let obstacles = obstaclesRef.current;
    obstacles = obstacles.map((obs) => ({
      top: { ...obs.top, x: obs.top.x - speed },
      bottom: { ...obs.bottom, x: obs.bottom.x - speed },
    }));
    if (obstacles.length === 0 || obstacles[obstacles.length - 1].top.x < 400) {
      const gapY = Math.random() * (canvas.height - gapSize) + gapSize / 2;
      obstacles.push({
        top: {
          x: canvas.width + 50,
          y: 0,
          width: 50,
          height: gapY - gapSize / 2,
        },
        bottom: {
          x: canvas.width + 50,
          y: gapY + gapSize / 2,
          width: 50,
          height: canvas.height - gapY - gapSize / 2,
        },
      });
    }
    obstaclesRef.current = obstacles.filter((obs) => obs.top.x > -50);
  };

  const drawObstacles = (obstacles: Obstacle[], context: CanvasRenderingContext2D, bee: Bee) => {
    obstacles.forEach((obs) => {
      drawRect(obs.top, context, collidesWithRect(bee, obs.top) ? "red" : "blue");
      drawRect(obs.bottom, context, collidesWithRect(bee, obs.bottom) ? "red" : "blue");
    });
  };

  const drawRect = (
    rect: Rect,
    context: CanvasRenderingContext2D,
    fillStyle: string | CanvasGradient | CanvasPattern,
  ) => {
    context.fillStyle = fillStyle;
    context.fillRect(rect.x, rect.y, rect.width, rect.height);
  };

  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const doUpdate = !isGameOver && !isPaused;
    if (doUpdate) {
      // updateBackground(canvas);
      backgroundRef.current.update(canvas);
      beeRef.current.update(canvas);
      updateObstacles(canvas);

      // Check for collisions
      if (checkCollision(beeRef.current, obstaclesRef.current, canvas.height)) {
        setIsGameOver(true);
        console.log("Game Over", beeRef.current, ...obstaclesRef.current);
        if (scoreRef.current > highScore) {
          localStorage.setItem("highScore", scoreRef.current.toString());
          setHighScore(scoreRef.current);
        }
      }

      // Update score and difficulty
      scoreRef.current += 1;
      gapSize *= gapReductionRate;
      speed += speedIncreaseRate;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    //drawBackground(context, canvas);
    backgroundRef.current.draw(context);
    beeRef.current.draw(context);
    drawObstacles(obstaclesRef.current, context, beeRef.current);

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
