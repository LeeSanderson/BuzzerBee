import { GameObject } from "../types";
import backgroundImage from "../assets/background.png";
import midgroundImage from "../assets/midground.png";
import foregroundImage from "../assets/forground.png";

const backgroundImg = new Image();
backgroundImg.src = backgroundImage;
const midgroundImg = new Image();
midgroundImg.src = midgroundImage;
const foregroundImg = new Image();
foregroundImg.src = foregroundImage;

export default class ParalaxBackgound implements GameObject {
  midgroundX: number = 0;
  foregroundX: number = 0;
  speed: number;

  constructor(
    private initialSpeed: number,
    private speedIncreaseRate: number,
  ) {
    this.speed = initialSpeed;
  }
  draw(context: CanvasRenderingContext2D): void {
    context.drawImage(backgroundImg, 0, 0, context.canvas.width, context.canvas.height);

    context.drawImage(midgroundImg, this.midgroundX, 0, context.canvas.width, context.canvas.height);
    context.drawImage(
      midgroundImg,
      this.midgroundX + context.canvas.width,
      0,
      context.canvas.width,
      context.canvas.height,
    );

    context.drawImage(
      foregroundImg,
      this.foregroundX,
      context.canvas.height - foregroundImg.height,
      context.canvas.width,
      foregroundImg.height,
    );
    context.drawImage(
      foregroundImg,
      this.foregroundX + context.canvas.width,
      context.canvas.height - foregroundImg.height,
      context.canvas.width,
      foregroundImg.height,
    );
  }

  update(canvas: HTMLCanvasElement): void {
    this.speed += this.speedIncreaseRate;

    this.midgroundX -= this.speed / 4;
    if (this.midgroundX <= -canvas.width) {
      this.midgroundX = 0;
    }

    this.foregroundX -= this.speed / 1.5;
    if (this.foregroundX <= -canvas.width) {
      this.foregroundX = 0;
    }
  }
}
