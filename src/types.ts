export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Bee = Rect & {
  velocity: number;
};

export type Obstacle = {
  top: Rect;
  bottom: Rect;
};

export interface GameObject {
  draw(context: CanvasRenderingContext2D): void;
  update(canvas: HTMLCanvasElement): void;
}
