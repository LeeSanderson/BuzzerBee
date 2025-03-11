import { GameObject, Obstacle, Rect } from "../types";

const initialGapSize = 200;
const gapReductionRate = 0.9999;

export default class ObstacleFactory implements GameObject {
  obstacles: Obstacle[] = [];
  speed: number;
  gapSize: number;

  constructor(
    private initialSpeed: number,
    private speedIncreaseRate: number,
  ) {
    this.speed = initialSpeed;
    this.gapSize = initialGapSize;
  }

  draw(context: CanvasRenderingContext2D): void {
    this.obstacles.forEach((obs) => {
      this.drawRect(obs.top, context, obs.collideWithTop ? "red" : "blue");
      this.drawRect(obs.bottom, context, obs.collideWithBottom ? "red" : "blue");
    });
  }

  drawRect(rect: Rect, context: CanvasRenderingContext2D, fillStyle: string | CanvasGradient | CanvasPattern) {
    context.fillStyle = fillStyle;
    context.fillRect(rect.x, rect.y, rect.width, rect.height);
  }

  update(canvas: HTMLCanvasElement): void {
    this.obstacles = this.obstacles.map((obs) => ({
      top: { ...obs.top, x: obs.top.x - this.speed },
      collideWithTop: obs.collideWithTop,
      bottom: { ...obs.bottom, x: obs.bottom.x - this.speed },
      collideWithBottom: obs.collideWithBottom,
    }));

    // Add a mew obstacle if the last one is far enough to the left
    if (this.obstacles.length === 0 || this.obstacles[this.obstacles.length - 1].top.x < 400) {
      const gapY = Math.random() * (canvas.height - this.gapSize) + this.gapSize / 2;
      this.obstacles.push({
        top: {
          x: canvas.width + 50,
          y: 0,
          width: 50,
          height: gapY - this.gapSize / 2,
        },
        collideWithTop: false,
        bottom: {
          x: canvas.width + 50,
          y: gapY + this.gapSize / 2,
          width: 50,
          height: canvas.height - gapY - this.gapSize / 2,
        },
        collideWithBottom: false,
      });
    }

    // Remove obstables that are off screen
    this.obstacles = this.obstacles.filter((obs) => obs.top.x > -50);

    // Increase speed and decrease gap size
    this.gapSize *= gapReductionRate;
    this.speed += this.speedIncreaseRate;
  }
}
