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
      if (e.key === 'Enter') {
        this.props.newTodo(this.state.label)
        this.setState({
          label: '',
        })
        this.props.createDate()
      }
    }
  }

  render() {
    return (
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={this.state.label}
        autoFocus
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
