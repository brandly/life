import React from 'react'
import Life from '../models/life'
import LifeHeader from './life-header'
import LifeBoard from './life-board'

const cellSize = 40
const roomForHeader = 60

const width = Math.floor(window.innerWidth / cellSize)
const height = Math.floor((window.innerHeight - roomForHeader) / cellSize)

const component = React.createClass({
  life: new Life({ width, height }),

  componentWillMount() {
    this.life.addChangeListener(this._onChange)
  },

  getInitialState() {
    return {
      life: this.life,
      board: this.life.board
    }
  },

  _onChange() {
    this.setState({ board: this.life.board })
  },

  render() {
    const { life } = this.state

    return (
      <div className="life-wrapper">
        <LifeHeader life={life} />
        <LifeBoard life={life} board={life.board} />
      </div>
    )
  }
})

module.exports = component
