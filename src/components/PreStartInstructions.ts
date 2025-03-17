import { GameObject } from "../types";

export default class PreStartInstructions implements GameObject {
  draw(context: CanvasRenderingContext2D): void {
    context.font = "30px 'Press Start 2P', cursive";
    context.fillStyle = "brown";
    context.textAlign = "center";
    context.fillText("Tap or Click to Start", context.canvas.width / 2, context.canvas.height / 2);
  }

  update(_canvas: HTMLCanvasElement): void {
    // No update logic needed for static instructions
  }
}
