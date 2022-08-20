import React, { useState } from 'react'
import PropTypes from 'prop-types'

import TodoListItem from './todo-list-item'

import './todo-list.css'

function TodoList(props) {
  const [label, setLabel] = useState('')

  function newTextEditTask(e) {
    setLabel(e.target.value)
  }

  function newEditTask(e) {
    const { newTodo, clearEditTodo, createDate } = props
    if (e.key === 'Enter') {
      newTodo(label)
      clearEditTodo()
      createDate()
    }
  }

  const { data, delItem, onToggleDone, filterStatus, editElement } = props
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
          <li className={classNames}>
            <input
              type="text"
              className="edit"
              defaultValue={item.description}
              onChange={newTextEditTask}
              onKeyPress={newEditTask}
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

export default TodoList
