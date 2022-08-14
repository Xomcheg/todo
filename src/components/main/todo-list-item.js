import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './todo-list-item.css'

export default class TodoListItem extends Component {
  constructor() {
    super()
    this.timer = null

    this.state = {
      // id: '',
      min: '',
      sec: '',
      timerStatus: '',
    }

    this.timer = () => {
      const { sec, min } = this.state
      const oldMin = Number(min)
      const oldSec = Number(sec)
      let newMin
      let newSec

      if (oldSec + 1 < 10) {
        newSec = `0${oldSec + 1}`
      } else newSec = oldSec + 1

      if (oldMin < 10) {
        newMin = `0${oldMin}`
      } else newMin = oldMin

      if (oldSec >= 60) {
        newSec = `0${0}`
        if (oldMin + 1 < 10) {
          newMin = `0${oldMin + 1}`
        } else {
          newMin = oldMin + 1
        }
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
    let newMin
    let newSec
    if (minutes < 10) {
      newMin = `0${minutes}`
    } else {
      newMin = minutes
    }
    if (seconds < 10) {
      newSec = `0${seconds}`
    } else {
      newSec = seconds
    }
    this.setState({
      // id: firstId,
      min: newMin,
      sec: newSec,
      timerStatus: firstTimerStatus,
    })
  }

  // pauseTimer() {
  //   clearInterval(this.timer)
  // }

  render() {
    // console.log(this.state)
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
            &nbsp; {min}:{sec}
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

// export default TodoListItem

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
