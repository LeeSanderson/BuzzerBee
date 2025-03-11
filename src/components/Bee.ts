//import beeImage from "../assets/bee.svg";
import bee1 from "../assets/bee1.png";
import bee2 from "../assets/bee2.png";
import { GameObject } from "../types";
import GameState from "./GameState";

const beeImg1 = new Image();
beeImg1.src = bee1;
const beeImg2 = new Image();
beeImg2.src = bee2;

const gravity = 0.08;
const flapStrength = -3.5;

export default class Bee implements GameObject {
  _gameState: GameState;
  x: number;
  y: number;
  width: number;
  height: number;
  velocity: number;
  beeFrames = [beeImg1, beeImg2];
  beeFrameIndex = 0;

  constructor(gameState: GameState) {
    this._gameState = gameState;
    this.x = 100;
    this.y = 300;
    this.width = 40;
    this.height = 40;
    this.velocity = 0;
  }

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.beeFrames[this.beeFrameIndex], this.x, this.y, this.width, this.height);

    if (this._gameState.isAlive) {
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
