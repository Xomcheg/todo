import React from 'react'

import './header.css'

import NewTodo from '../new-todo'

function Header(props) {
  const { newTodo, createDate, checkMouseClick } = props
  return (
    <header className="header" role="presentation" onClick={checkMouseClick}>
      <h1>todos</h1>
      <NewTodo newTodo={newTodo} createDate={createDate} checkMouseClick={checkMouseClick} />
    </header>
  )
}

export default Header
