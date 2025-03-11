import Bee from "./components/Bee";
import { Obstacle, Rect } from "./types";

export const checkCollision = (bee: Bee, obstacles: Obstacle[], canvasHeight: number): boolean => {
  for (const obs of obstacles) {
    const withinObstacleX = bee.x + bee.width > obs.top.x && bee.x < obs.top.x + obs.top.width;
    const collidesWithCeiling = bee.y <= 0;
    const collidesWithFloor = bee.y + bee.height >= canvasHeight;

    if (
      collidesWithCeiling ||
      collidesWithFloor ||
      (withinObstacleX && (collidesWithRect(bee, obs.top) || collidesWithRect(bee, obs.bottom)))
    ) {
      obs.collideWithTop = collidesWithRect(bee, obs.top);
      obs.collideWithBottom = collidesWithRect(bee, obs.bottom);
      return true;
    }
  }
  return false;
};

export const collidesWithRect = (r1: Rect, r2: Rect): boolean => {
  const collides = !(
    r1.x + r1.width < r2.x || // r1 is to the left of r2
    r1.x > r2.x + r2.width || // r1 is to the right of r2
    r1.y + r1.height < r2.y || // r1 is above r2
    r1.y > r2.y + r2.height // r1 is below r2
  );

  if (collides) {
    // console.log("Collision detected", r1, r2);
  }

  return collides;
};
