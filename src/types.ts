export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Obstacle = {
  top: Rect;
  collideWithTop: boolean;
  bottom: Rect;
  collideWithBottom: boolean;
  passed: boolean;
};

export interface GameObject {
  draw(context: CanvasRenderingContext2D): void;
  update(canvas: HTMLCanvasElement): void;
}
