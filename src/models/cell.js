
export default class Cell {
  constructor() {
    this.alive = false
  }

  isAlive() {
    return this.alive
  }

  giveLife() {
    this.alive = true
  }

  kill() {
    this.alive = false
  }
}
