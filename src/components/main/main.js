import React from 'react'

import TodoList from './todo-list'
import './main.css'

function Main(props) {
  const { data, createDate, filterStatus, delItem, onToggleDone, editElement, clearEditTodo, newTodo } = props
  return (
    <section className="main">
      <TodoList
        data={data}
        createDate={createDate}
        filterStatus={filterStatus}
        delItem={delItem}
        onToggleDone={onToggleDone}
        editElement={editElement}
        clearEditTodo={clearEditTodo}
        newTodo={newTodo}
      />
    </section>
  )
}
export default Main
