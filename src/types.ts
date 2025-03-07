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
