import React from 'react'
import { range } from 'lodash'
import classNames from 'classnames'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

const component = React.createClass({
  toggleCell(x, y) {
    const cell = this.props.life.toggleCell(x, y)
  },

  render() {
    const { life, board } = this.props

    const rows = range(life.height).map(y => {
      const cells = range(life.width).map(x => {
        const cell = life.getCell(x, y)
        const classes = classNames({
          'life-cell': true,
          alive: cell.isAlive()
        })
        return <td className={classes} key={x} onTouchTap={this.toggleCell.bind(this, x, y)}></td>
      })
      return <tr className="life-row" key={y}>{cells}</tr>
    })

    return (
      <table className="life-board">
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
})

module.exports = component
