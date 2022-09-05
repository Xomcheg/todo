import React, { useState, useEffect } from 'react'

function TodoListEditItem(props) {
  const [label, setLabel] = useState('')
  const [editLabel, setEditLabel] = useState('')

  const inputEditRef = React.createRef()

  const newTextEditTask = (e) => {
    const { value } = e.target
    setEditLabel(value)
  }

  const newEditTask = (e) => {
    const { saveEditTodo, data } = props
    const { id } = data
    if (e.key === 'Enter') {
      saveEditTodo(editLabel, id)
    }
    if (e.key === 'Escape') {
      saveEditTodo(label, id)
    }
  }

  useEffect(() => {
    const { data } = props
    const { description } = data
    inputEditRef.current.focus()
    setLabel(description)
    setEditLabel(description)
  }, [])

  const { data } = props
  return (
    <input
      ref={inputEditRef}
      type="text"
      className="edit"
      defaultValue={data.description}
      onChange={newTextEditTask}
      onKeyDown={newEditTask}
    />
  )
}

export default TodoListEditItem
