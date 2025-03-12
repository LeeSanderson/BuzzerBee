import { GameObject, Obstacle, Rect } from "../types";
import honeycomb from "../assets/Honeycomb.png";

const initialGapSize = 200;
const gapReductionRate = 0.9999;

const honeycombImg = new Image();
honeycombImg.src = honeycomb;

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
      // this.drawRect(obs.top, context, obs.collideWithTop ? "red" : "blue");
      // this.drawRect(obs.bottom, context, obs.collideWithBottom ? "red" : "blue");
      this.drawImage(obs.top, context, obs.collideWithTop ? "red" : "brown");
      this.drawImage(obs.bottom, context, obs.collideWithBottom ? "red" : "brown");
    });
  }

  drawImage(rect: Rect, context: CanvasRenderingContext2D, borderColour: string) {
    this.drawRect(rect, context, borderColour);
    const honneycombPattern = context.createPattern(honeycombImg, "repeat");
    if (honneycombPattern) {
      context.fillStyle = honneycombPattern;
      const borderWidth = 4;
      context.fillRect(
        rect.x + borderWidth,
        rect.y + borderWidth,
        rect.width - 2 * borderWidth,
        rect.height - 2 * borderWidth,
      );
    }
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
      passed: obs.passed,
    }));

    // Add a new obstacle if the last one is far enough to the left
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
        passed: false,
      });
    }

    // Remove obstacles that are off screen
    this.obstacles = this.obstacles.filter((obs) => obs.top.x > -50);

    // Increase speed and decrease gap size
    this.gapSize *= gapReductionRate;
    this.speed += this.speedIncreaseRate;
  }
}
