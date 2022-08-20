import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './new-todo.css'

function NewTodo(props) {
  const [label, setLabel] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const onChangeText = (e) => {
    const { value } = e.target
    setLabel(value)
  }
  const clickEnter = (e) => {
    const { newTodo, createDate } = props
    const checkMin = min === '' ? 0 : min
    const checkSec = sec === '' ? 0 : sec
    console.log('checkmin', checkMin)
    if (e.key === 'Enter' && label !== '') {
      newTodo(label, checkMin, checkSec)
      setLabel('')
      setMin('')
      setSec('')
      createDate()
    }
  }
  const onChangeMin = (e) => {
    const { value } = e.target
    setMin(value)
  }
  const onChangeSec = (e) => {
    const { value } = e.target
    setSec(value)
  }

  return (
    <form className="new-todo-form">
      <input
        type="text"
        className="new-todo"
        placeholder="Task"
        value={label}
        onChange={onChangeText}
        onKeyPress={clickEnter}
      />
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Min"
        value={min}
        onChange={onChangeMin}
        onKeyPress={clickEnter}
      />
      <input
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
