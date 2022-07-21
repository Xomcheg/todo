import React, { Component } from 'react'

import TodoList from './todo-list'
import './main.css'

export default class Main extends Component {
  render() {
    const data = this.props
    return (
      <section className="main">
        <TodoList {...data} />
      </section>
    )
  }
}
