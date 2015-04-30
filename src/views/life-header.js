import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

const component = React.createClass({
  getInitialState() {
    return {
      speed: 500,
      intervalId: null
    }
  },

  play() {
    const intervalId = setInterval(() => {
      this.props.life.tick()
    }, this.state.speed)
    this.setState({ intervalId })
  },

  pause() {
    clearInterval(this.state.intervalId)
    this.setState({ intervalId: null })
  },

  render() {
    const { life } = this.state
    return (
      <div className="life-header">
        <h1>Life</h1>
        <div className="life-settings">
          {//<input value={this.state.speed} />
          }
          {this.state.intervalId ?
            (<button onTouchTap={this.pause}>pause</button>) :
            (<button onTouchTap={this.play}>play</button>)
          }
        </div>
      </div>
    )
  }
})

module.exports = component
