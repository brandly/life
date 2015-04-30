import { range } from 'lodash'
import Cell from './cell'
import ChangeEmitter from './change-emitter'

export default class Life extends ChangeEmitter {
  constructor(opts) {
    super()
    this.width = opts.width
    this.height = opts.height
    this.board = range(this.width).map(column => {
      return range(this.height).map(cell => new Cell)
    })
  }

  // Any live cell with fewer than two live neighbours dies, as if caused by under-population.
  // Any live cell with two or three live neighbours lives on to the next generation.
  // Any live cell with more than three live neighbours dies, as if by overcrowding.
  // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
  tick() {
    this.board = this.board.map((column, x) => {
      return column.map((oldCell, y) => {
        const count = this.countLiveNeighbors(x, y)
        const newCell = new Cell

        if (oldCell.isAlive()) {
          if (count > 1 && count < 4) {
            newCell.giveLife()
          }
        } else {
          if (count === 3) {
            newCell.giveLife()
          }
        }

        return newCell
      })
    })
    this.emitChange()
  }

  countLiveNeighbors(x, y) {
    return this.getNeighbors(x, y).filter(n => n.isAlive()).length
  }

  getNeighbors(x, y) {
    const neighbors = []
    // above
    if (y > 0) neighbors.push(this.getCell(x, y - 1))
    // above-right
    if (y > 0 && x + 1 < this.width) neighbors.push(this.getCell(x + 1, y - 1))
    // right
    if (x + 1 < this.width) neighbors.push(this.getCell(x + 1, y))
    // below-right
    if (y + 1 < this.height && x + 1 < this.width) neighbors.push(this.getCell(x + 1, y + 1))
    // below
    if (y + 1 < this.height) neighbors.push(this.getCell(x, y + 1))
    // below-left
    if (x > 0 && y + 1 < this.height) neighbors.push(this.getCell(x - 1, y + 1))
    // left
    if (x > 0) neighbors.push(this.getCell(x - 1, y))
    // above-left
    if (x > 0 && y > 0) neighbors.push(this.getCell(x - 1, y - 1))
    return neighbors
  }

  getCell(x, y) {
    return this.board[x][y]
  }

  toggleCell(x, y) {
    const cell = this.getCell(x, y)
    cell.isAlive() ? cell.kill() : cell.giveLife()
    this.emitChange()
  }
}
