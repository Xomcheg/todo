import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TodoListItem from './todo-list-item'

import './todo-list.css'

export default class TodoList extends Component {
  constructor() {
    super()

    this.state = {
      label: '',
    }

    this.newTextEditTask = (e) => {
      this.setState({
        label: e.target.value,
      })
    }

    this.newEditTask = (e) => {
      const { newTodo, clearEditTodo, createDate } = this.props
      const { label } = this.state
      if (e.key === 'Enter') {
        newTodo(label)
        clearEditTodo()
        createDate()
      }
    }
  }

  render() {
    const { data, delItem, onToggleDone, filterStatus, editElement } = this.props

    const elements = data
      .filter((el) => {
        if (filterStatus === 'all') {
          return true
        }
        if (filterStatus === 'active') {
          return !el.done
        }
        return el.done
      })
      .map((item) => {
        const { id, done, edit } = item
        let classNames = ''

        if (done) {
          classNames += 'completed'
        }

        if (edit) {
          classNames += 'editing'
          return (
            <li key={id} className={classNames}>
              <input
                type="text"
                className="edit"
                defaultValue={item.description}
                onChange={this.newTextEditTask}
                onKeyPress={this.newEditTask}
                onClick={this.checkClick}
              />
            </li>
          )
        }
        return (
          <li key={id} className={classNames}>
            <TodoListItem
              data={item}
              delItem={() => {
                delItem(id)
              }}
              onToggleDone={() => {
                onToggleDone(id)
              }}
              editElement={() => {
                editElement(id)
              }}
            />
          </li>
        )
      })

    return <ul className="todo-list">{elements}</ul>
  }
}

TodoList.propTypes = {
  delItem: PropTypes.func,
  onToggleDone: PropTypes.func,
  filterStatus: PropTypes.string,
  editElement: PropTypes.func,
}

TodoList.defaultProps = {
  delItem: () => {},
  onToggleDone: () => {},
  editElement: () => {},
  filterStatus: 'all',
}
