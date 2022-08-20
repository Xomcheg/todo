import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './todo-list-item.css'

export default class TodoListItem extends Component {
  constructor() {
    super()
    this.timer = null

    this.state = {
      min: '',
      sec: '',
      timerStatus: '',
    }

    this.timer = () => {
      const { sec, min } = this.state
      let newMin = Number(min)
      let newSec = Number(sec) + 1
      if (newSec === 60) {
        newSec = 0
        newMin += 1
      }
      this.setState({
        sec: newSec,
        min: newMin,
      })
    }

    this.start = (e) => {
      const { timerStatus } = this.state
      if (e.target.classList.contains('icon-play') && !timerStatus) {
        this.setState({
          timerStatus: true,
        })
        this.timerId = setInterval(this.timer.bind(this), 1000)
      }
    }

    this.stop = () => {
      clearInterval(this.timerId)
      this.setState({
        timerStatus: false,
      })
    }
  }

  UNSAFE_componentWillMount() {
    const { data } = this.props
    const { minutes, seconds, timerStatus: firstTimerStatus } = data
    const minutesInSeconds = Math.floor(Number(seconds) / 60)
    const resultMin = Number(minutes) + minutesInSeconds
    const resultSec = Number(seconds) - minutesInSeconds * 60
    this.setState({
      min: resultMin,
      sec: resultSec,
      timerStatus: firstTimerStatus,
    })
  }

  render() {
    const { min, sec } = this.state
    const { data, delItem, onToggleDone, editElement } = this.props
    const { description, created, id, check } = data

    return (
      <div className="view">
        <input className="toggle" type="checkbox" id={id} defaultChecked={check} onClick={onToggleDone} />
        <label htmlFor={id}>
          <span className="title">{description}</span>
          <span className="description">
            <button type="button" className="icon icon-play" onClick={this.start}>
              {' '}
            </button>
            <button type="button" className="icon icon-pause" onClick={this.stop}>
              {' '}
            </button>
            &nbsp; {min < 10 ? `0${min}` : `${min}`}:{sec < 10 ? `0${sec}` : `${sec}`}
          </span>
          {/* <span className="description">{description}</span> */}
          <span className="description">{created}</span>
        </label>
        <button type="button" className="icon icon-edit" onClick={editElement}>
          {' '}
        </button>
        <button type="button" className="icon icon-destroy" onClick={delItem}>
          {' '}
        </button>
      </div>
    )
  }
}

TodoListItem.propTypes = {
  delItem: PropTypes.func,
  onToggleDone: PropTypes.func,
  editElement: PropTypes.func,
}

TodoListItem.defaultProps = {
  delItem: () => {},
  onToggleDone: () => {},
  editElement: () => {},
}
