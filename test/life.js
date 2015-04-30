import assert from 'assert'
import Life from '../src/models/life'

describe('Life', function () {
  const width = 6
  const height = 4

  it('initializes a board', function () {
    const life = new Life({ width, height })

    assert.equal(width, life.board.length)
    life.board.forEach(column => {
      assert.equal(height, column.length)
    })
  })

  it('kills lonely cells', function () {
    const life = new Life({ width, height })

    const initialCell = life.getCell(0, 0)
    initialCell.giveLife()

    life.tick()
    const laterCell = life.getCell(0, 0)
    assert.equal(false, laterCell.isAlive())
  })

  it('lets blocks live', function () {
    const life = new Life({ width, height })

    life.getCell(0, 0).giveLife()
    life.getCell(1, 0).giveLife()
    life.getCell(0, 1).giveLife()
    life.getCell(1, 1).giveLife()

    life.tick()

    assert.equal(true, life.getCell(0, 0).isAlive())
    assert.equal(true, life.getCell(1, 0).isAlive())
    assert.equal(true, life.getCell(0, 1).isAlive())
    assert.equal(true, life.getCell(1, 1).isAlive())
  })

  it('lets blinkers blink', function () {
    const life = new Life({ width, height })

    life.getCell(1, 0).giveLife()
    life.getCell(1, 1).giveLife()
    life.getCell(1, 2).giveLife()

    life.tick()

    assert.equal(true, life.getCell(0, 1).isAlive())
    assert.equal(true, life.getCell(1, 1).isAlive())
    assert.equal(true, life.getCell(2, 1).isAlive())
  })
})
