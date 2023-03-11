// Write your code here
import {Component} from 'react'
import './index.css'

class Stopwatch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isTimerRunning: false,
      timeElapsedInSeconds: 0,
    }
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval)
  }

  onClickStart = () => {
    this.timerId = setInterval(this.updateTime, 1000)
    this.setState({isTimerRunning: true})
  }

  updateTime = () => {
    this.setState(prevState => ({
      timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
    }))
  }

  onClickStop = () => {
    clearInterval(this.timerId)
    this.setState({isTimerRunning: false})
  }

  onClickReset = () => {
    clearInterval(this.timerId)
    this.setState({isTimerRunning: false, timeElapsedInSeconds: 0})
  }

  renderMinutes = () => {
    const {timeElapsedInSeconds} = this.state
    const minutes = Math.floor(timeElapsedInSeconds / 60)

    if (minutes < 10) {
      return `0${minutes}`
    }
    return minutes
  }

  renderSeconds = () => {
    const {timeElapsedInSeconds} = this.state
    const seconds = Math.floor(timeElapsedInSeconds % 60)
    if (seconds < 10) {
      return `0${seconds}`
    }
    return seconds
  }

  render() {
    const {isTimerRunning} = this.state
    const time = `${this.renderMinutes()}:${this.renderSeconds()}`
    return (
      <div className="app-container">
        <div className="stopwatch-container">
          <h1 className="stopwatch">Stopwatch</h1>
          <div className="timer-container">
            <div className="timer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                alt="stopwatch"
                className="timer-image"
              />
              <p className="heading">Timer</p>
            </div>

            <h1 className="stopwatch-timer">{time}</h1>
            <div className="timer-buttons">
              <button
                type="button"
                className="btn start-btn"
                onClick={this.onClickStart}
                disabled={isTimerRunning}
              >
                Start
              </button>
              <button
                type="button"
                className="btn stop-btn"
                onClick={this.onClickStop}
              >
                Stop
              </button>
              <button
                type="button"
                className="btn reset-btn"
                onClick={this.onClickReset}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
