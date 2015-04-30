import assert from 'assert'
import Cell from '../src/models/cell'

describe('Cell', function () {
  it('is not alive at first', function () {
    const cell = new Cell
    assert.equal(false, cell.isAlive())
  })

  it('can be given life', function () {
    const cell = new Cell
    cell.giveLife()
    assert.equal(true, cell.isAlive())
  })
})
