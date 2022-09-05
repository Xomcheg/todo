import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import './new-todo.css'

function NewTodo(props) {
  const [label, setLabel] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const inputTascRef = React.createRef()

  const onChangeText = (e) => {
    const { value } = e.target
    setLabel(value)
  }
  const clickEnter = (e) => {
    const { newTodo, createDate } = props
    const checkMin = min === '' ? 0 : min
    const checkSec = sec === '' ? 0 : sec
    if (e.key === 'Enter' && label !== '') {
      newTodo(label, checkMin, checkSec)
      setLabel('')
      setMin('')
      setSec('')
      createDate()
    }
  }
  const onChangeMin = (e) => {
    let { value } = e.target
    const minimum = 0
    if (value < minimum) {
      value = minimum
    }
    setMin(value)
  }
  const onChangeSec = (e) => {
    let { value } = e.target
    const { maxLength } = e.target
    const minimal = 0
    const max = 59
    if (value.length > maxLength) {
      value = value.slice(0, maxLength)
    }
    if (value < minimal) {
      value = minimal
    }
    if (value > max) {
      value = max
    }
    setSec(value)
  }

  useEffect(() => {
    inputTascRef.current.focus()
  }, [])

  const { checkMouseClick } = props
  return (
    <form className="new-todo-form" role="presentation" onClick={checkMouseClick}>
      <input
        ref={inputTascRef}
        type="text"
        className="new-todo"
        placeholder="Task"
        value={label}
        onChange={onChangeText}
        onKeyPress={clickEnter}
      />
      <input
        maxLength={3}
        type="number"
        className="new-todo-form__timer"
        placeholder="Min"
        value={min}
        onChange={onChangeMin}
        onKeyPress={clickEnter}
      />
      <input
        maxLength={2}
        type="number"
        className="new-todo-form__timer"
        placeholder="Sec"
        value={sec}
        onChange={onChangeSec}
        onKeyPress={clickEnter}
      />
    </form>
  )
}

NewTodo.propTypes = {
  newTodo: PropTypes.func,
  createDate: PropTypes.func,
}
NewTodo.defaultProps = {
  newTodo: () => {},
  createDate: () => {},
}

export default NewTodo
