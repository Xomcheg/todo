import React from 'react'
import PropTypes from 'prop-types'

import './todo-list-item.css'

function TodoListItem(props) {
  const { data, delItem, onToggleDone, editElement } = props
  const { description, created, id, check } = data

  return (
    <div className="view">
      <input className="toggle" type="checkbox" id={id} defaultChecked={check} onClick={onToggleDone} />
      <label htmlFor={id}>
        <span className="description">{description}</span>
        <span className="created">{created}</span>
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
  // data: PropTypes.object,
  delItem: PropTypes.func,
  onToggleDone: PropTypes.func,
  editElement: PropTypes.func,
}

TodoListItem.defaultProps = {
  delItem: () => {},
  onToggleDone: () => {},
  editElement: () => {},
  // data: {},
}
