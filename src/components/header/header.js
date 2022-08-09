import React from 'react'

import NewTodo from '../new-todo'

function Header(props) {
  const { newTodo, createDate } = props
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTodo newTodo={newTodo} createDate={createDate} />
    </header>
  )
}

export default Header
