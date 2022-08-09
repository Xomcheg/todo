import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './new-todo.css'

export default class NewTodo extends Component {
  constructor() {
    super()
    this.state = {
      label: '',
    }

    this.onChangeText = (e) => {
      this.setState({
        label: e.target.value,
      })
    }
    this.clickEnter = (e) => {
      const { newTodo, createDate } = this.props
      const { label } = this.state
      if (e.key === 'Enter') {
        newTodo(label)
        this.setState({
          label: '',
        })
        createDate()
      }
    }
  }

  render() {
    const { label } = this.state
    return (
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={label}
        onChange={this.onChangeText}
        onKeyPress={this.clickEnter}
      />
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
