import React, { useRef, useEffect, useState } from "react";
import beeImage from "./assets/bee.svg";
import { checkCollision, collidesWithRect } from "./collision";
import { Bee, Obstacle, Rect } from "./types";

const initialBeeState: Bee = {
  x: 100,
  y: 300,
  width: 20,
  height: 20,
  velocity: 0,
};

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score] = useState(0);
  const scoreRef = useRef(score);
  const [highScore, setHighScore] = useState(() => Number(localStorage.getItem("highScore")) || 0);
  const [obstacles] = useState<Obstacle[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [beeState, setBeeState] = useState<Bee>(initialBeeState);
  const beeStateRef = useRef<Bee>(beeState);

  const obstaclesRef = useRef(obstacles);
  const animationFrameIdRef = useRef<number | null>(null);
  const gravity = 0.04;
  const flapStrength = -2.5;
  const initialGapSize = 200;
  const gapReductionRate = 0.9999;
  const initialSpeed = 3;
  const speedIncreaseRate = 0.002;
  const beeImg = new Image();
  beeImg.src = beeImage;

  let gapSize = initialGapSize;
  let speed = initialSpeed;

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const updateBeePosition = () => {
    beeStateRef.current = {
      ...beeStateRef.current,
      y: beeStateRef.current.y + beeStateRef.current.velocity,
      velocity: beeStateRef.current.velocity + gravity,
    };
  };

  const drawBee = (context: CanvasRenderingContext2D) => {
    context.drawImage(
      beeImg,
      beeStateRef.current.x,
      beeStateRef.current.y,
      beeStateRef.current.width,
      beeStateRef.current.height,
    );
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
      updateBeePosition();
      updateObstacles(canvas);

      // Check for collisions
      if (checkCollision(beeStateRef.current, obstaclesRef.current, canvas.height)) {
        setIsGameOver(true);
        console.log("Game Over", beeStateRef.current, ...obstaclesRef.current);
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
    drawBee(context);
    drawObstacles(obstaclesRef.current, context, beeStateRef.current);

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
      beeStateRef.current = { ...beeStateRef.current, velocity: flapStrength };
      setBeeState(beeStateRef.current);
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
