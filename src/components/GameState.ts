export default class GameState {
  private _isGameOver: boolean;
  private _score: number;
  private _highScore: number;
  private _isPaused: boolean;
  private _isPreStart: boolean;

  constructor() {
    this.reset();
    this._highScore = Number(localStorage.getItem("highScore")) || 0;
  }

  reset(): void {
    this._isGameOver = false;
    this._score = 0;
    this._isPaused = false;
    this._isPreStart = true;
  }

  get isGameOver(): boolean {
    return this._isGameOver;
  }

  get score(): number {
    return this._score;
  }

  get highScore(): number {
    return this._highScore;
  }

  get isPaused(): boolean {
    return this._isPaused;
  }

  get isPreStart(): boolean {
    return this._isPreStart;
  }

  get isAlive(): boolean {
    return !this._isGameOver && !this._isPaused && !this._isPreStart;
  }

  get initialSpeed(): number {
    return 3;
  }

  get speedIncreaseRate(): number {
    return 0.002;
  }

  setGameOver(isGameOver: boolean): void {
    this._isGameOver = isGameOver;
    if (isGameOver) {
      if (this._score > this._highScore) {
        this._highScore = this._score;
        localStorage.setItem("highScore", this._highScore.toString());
      }
    }
  }

  setScore(score: number): void {
    this._score = score;
  }

  togglePaused(): void {
    this._isPaused = !this._isPaused;
  }

  startGame(): void {
    this._isPreStart = false;
  }
}
