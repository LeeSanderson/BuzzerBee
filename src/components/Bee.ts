//import beeImage from "../assets/bee.svg";
import bee1 from "../assets/bee1.png";
import bee2 from "../assets/bee2.png";
import deadBee1 from "../assets/dead-bee1.png";
import deadBee2 from "../assets/dead-bee2.png";
import { GameObject } from "../types";
import GameState from "./GameState";

const beeImg1 = new Image();
beeImg1.src = bee1;
const beeImg2 = new Image();
beeImg2.src = bee2;

const deadBeeImg1 = new Image();
deadBeeImg1.src = deadBee1;
const deadBeeImg2 = new Image();
deadBeeImg2.src = deadBee2;

const gravity = 0.08;
const flapStrength = -3.5;

export default class Bee implements GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  velocity: number;
  beeFrames = [beeImg1, beeImg2];
  deadBeeFrames = [deadBeeImg1, deadBeeImg2];
  beeFrameIndex = 0;

  constructor(private readonly gameState: GameState) {
    this.reset();
  }

  reset(): void {
    this.x = 100;
    this.y = 300;
    this.width = 40;
    this.height = 40;
    this.velocity = 0;
  }

  draw(context: CanvasRenderingContext2D) {
    if (this.gameState.isGameOver) {
      context.drawImage(this.deadBeeFrames[this.beeFrameIndex], this.x, this.y, this.width, this.height);
    } else {
      context.drawImage(this.beeFrames[this.beeFrameIndex], this.x, this.y, this.width, this.height);
    }

    if (!this.gameState.isPaused) {
      this.beeFrameIndex = (this.beeFrameIndex + 1) % this.beeFrames.length;
    }
  }

  update(_canvas: HTMLCanvasElement) {
    this.y = this.y + this.velocity;
    this.velocity = this.velocity + gravity;
  }

  flap() {
    this.velocity = flapStrength;
  }
}
