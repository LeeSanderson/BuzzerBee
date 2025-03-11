export default class GameState {
  private _isGameOver: boolean;
  private _score: number;
  private _highScore: number;
  private _isPaused: boolean;

  constructor() {
    this._isGameOver = false;
    this._score = 0;
    this._highScore = Number(localStorage.getItem("highScore")) || 0;
    this._isPaused = false;
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

  get isAlive(): boolean {
    return !this._isGameOver && !this._isPaused;
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
}
