import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import './todo-list-item.css'

function TodoListItem(props) {
  const [sec, setSec] = useState(0)

  const [timerStatus, setTimerStatus] = useState(false)
  const [timerId, setTimerId] = useState(null)

  const displayMin = Math.floor(sec / 60)
  const displaySec = sec - displayMin * 60
  function useTimer() {
    setSec((currentSec) => currentSec + 1)
  }

  const start = () => {
    setTimerStatus(true)
  }

  const stop = () => {
    clearInterval(timerId)
    setTimerId(null)
    setTimerStatus(false)
  }

  useEffect(() => {
    if (timerStatus) {
      const timerIds = setInterval(() => useTimer(), 1000)
      setTimerId(timerIds)
    }
    return () => {
      clearInterval(timerId)
    }
  }, [timerStatus])

  useEffect(() => {
    const { data } = props
    const { minutes, seconds } = data
    const time = Number(minutes) * 60 + Number(seconds)
    setSec(time)
  }, [])
  const { data, delItem, onToggleDone, editElement } = props
  const { description, created, id, check } = data

  return (
    <div className="view">
      <input className="toggle" type="checkbox" id={id} defaultChecked={check} onClick={onToggleDone} />
      <label htmlFor={id}>
        <span className="title">{description}</span>
        <span className="description">
          <button type="button" className="icon icon-play" onClick={start}>
            {' '}
          </button>
          <button type="button" className="icon icon-pause" onClick={stop}>
            {' '}
          </button>
          &nbsp; {displayMin < 10 ? `0${displayMin}` : `${displayMin}`}:
          {displaySec < 10 ? `0${displaySec}` : `${displaySec}`}
        </span>
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

export default TodoListItem

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
