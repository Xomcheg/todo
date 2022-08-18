import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './new-todo.css'

export default class NewTodo extends Component {
  constructor() {
    super()
    this.state = {
      label: '',
      min: '',
      sec: '',
    }

    this.onChangeText = (e) => {
      const { value } = e.target
      this.setState({
        label: value,
      })
    }
    this.clickEnter = (e) => {
      const { newTodo, createDate } = this.props
      const { label, min, sec } = this.state
      const checkMin = min === '' ? 0 : min
      const checkSec = sec === '' ? 0 : sec
      if (e.key === 'Enter' && label !== '') {
        newTodo(label, checkMin, checkSec)
        this.setState({
          label: '',
          min: '',
          sec: '',
        })
        createDate()
      }
    }
    this.onChangeMin = (e) => {
      const { value } = e.target
      this.setState({
        min: value,
      })
    }
    this.onChangeSec = (e) => {
      const { value } = e.target
      this.setState({
        sec: value,
      })
    }
  }

  render() {
    const { label, min, sec } = this.state
    return (
      <form className="new-todo-form">
        <input
          type="text"
          className="new-todo"
          placeholder="Task"
          value={label}
          onChange={this.onChangeText}
          onKeyPress={this.clickEnter}
        />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Min"
          value={min}
          onChange={this.onChangeMin}
          onKeyPress={this.clickEnter}
        />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Sec"
          value={sec}
          onChange={this.onChangeSec}
          onKeyPress={this.clickEnter}
        />
      </form>
    )
  }
}

NewTodo.propTypes = {
  newTodo: PropTypes.func,
  createDate: PropTypes.func,
}
NewTodo.defaultProps = {
  newTodo: () => {},
  createDate: () => {},
}
