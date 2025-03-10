import beeImage from "../assets/bee.svg";
import { GameObject } from "../types";

const beeImg = new Image();
beeImg.src = beeImage;

const gravity = 0.08;
const flapStrength = -3.5;

export default class Bee implements GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  velocity: number;

  constructor() {
    this.x = 100;
    this.y = 300;
    this.width = 20;
    this.height = 20;
    this.velocity = 0;
  }

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(beeImg, this.x, this.y, this.width, this.height);
  }

  update(_canvas: HTMLCanvasElement) {
    this.y = this.y + this.velocity;
    this.velocity = this.velocity + gravity;
  }

  flap() {
    this.velocity = flapStrength;
  }
}
