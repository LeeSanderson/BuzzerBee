import { checkCollision } from "./collision";
import { Bee, Obstacle } from "./types";

describe("checkCollision", () => {
  const bee: Bee = { x: 100, y: 0, width: 20, height: 20, velocity: 0 };
  const obstacles: Obstacle[] = [
    {
      top: { x: 100, y: 0, width: 50, height: 100 },
      bottom: { x: 100, y: 300, width: 50, height: 300 },
    },
  ];
  const canvasHeight = 600;

  it("should return false when there are no obstacles", () => {
    bee.y = 300;
    const noObstacles: Obstacle[] = [];
    const result = checkCollision(bee, noObstacles, canvasHeight);
    expect(result).toBe(false);
  });

  it("should return true when the bee collides with the top obstacle", () => {
    bee.y = 50;
    const result = checkCollision(bee, obstacles, canvasHeight);
    expect(result).toBe(true);
  });

  it("should return true when the bee collides with the bottom obstacle", () => {
    bee.y = 400;
    const result = checkCollision(bee, obstacles, canvasHeight);
    expect(result).toBe(true);
  });

  it("should return true when the bee collides with the ceiling", () => {
    bee.y = -10;
    const result = checkCollision(bee, obstacles, canvasHeight);
    expect(result).toBe(true);
  });

  it("should return true when the bee collides with the floor", () => {
    bee.y = 590;
    const result = checkCollision(bee, obstacles, canvasHeight);
    expect(result).toBe(true);
  });

  it("should return false when the bee flies through the gap", () => {
    bee.y = 250;
    const result = checkCollision(bee, obstacles, canvasHeight);
    expect(result).toBe(false);
  });
});
