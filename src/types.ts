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
  // eslint-disable-next-line no-unused-vars
  draw(context: CanvasRenderingContext2D): void;
  update(): void;
}
