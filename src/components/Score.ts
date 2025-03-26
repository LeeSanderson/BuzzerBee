import { GameObject } from "../types";
import GameState from "./GameState";

export default class Score implements GameObject {
  _gameState: GameState;

  constructor(gameState: GameState) {
    this._gameState = gameState;
  }
  reset(): void {
    // No reset logic needed for the score display
  }

  draw(context: CanvasRenderingContext2D) {
    context.font = "20px 'Press Start 2P', cursive";
    context.fillStyle = "black";
    context.textAlign = "left";
    context.fillText(`Score: ${this._gameState.score}`, 10, 50);
  }

  update(_canvas: HTMLCanvasElement) {
    // No update logic needed for the score display
  }
}
