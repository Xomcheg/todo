import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

import Header from '../header'
import Main from '../main'
import Footer from '../footer'

import './todoapp.css'

export default class App extends Component {
  constructor() {
    super()
    this.counter = 100

    this.state = {
      data: [],
      filterStatus: 'all',
    }

    this.filtersElements = (e) => {
      const { target } = e
      if (target.nodeName === 'BUTTON') {
        this.setState({
          filterStatus: target.textContent.toLowerCase(),
        })
      }
    }

    this.editElement = (id) => {
      this.setState(({ data }) => {
        const idx = data.findIndex((el) => el.id === id)
        const oldItem = data[idx]
        const newItem = { ...oldItem, edit: !oldItem.edit, done: false }
        const newArr = [...data.slice(0, idx), newItem, ...data.slice(idx + 1)]
        return {
          data: newArr,
        }
      })
    }

    this.clearComplated = () => {
      this.setState(({ data }) => {
        const newArr = data.filter((el) => !el.done)
        return {
          data: newArr,
        }
      })
    }

    this.onToggleDone = (id) => {
      this.setState(({ data }) => {
        const idx = data.findIndex((el) => el.id === id)
        const oldItem = data[idx]
        const newItem = { ...oldItem, done: !oldItem.done, check: !oldItem.check }
        const newArr = [...data.slice(0, idx), newItem, ...data.slice(idx + 1)]
        return {
          data: newArr,
        }
      })
    }

    this.delItem = (id) => {
      this.setState(({ data }) => {
        const idx = data.findIndex((el) => el.id === id)
        const newArr = [...data.slice(0, idx), ...data.slice(idx + 1)]
        return {
          data: newArr,
        }
      })
    }

    this.newTodo = (text) => {
      const newItem = this.createItem(text)
      newItem.id = this.upCounter()
      this.setState(({ data }) => {
        const newArr = [newItem, ...data]
        return {
          data: newArr,
        }
      })
    }

    this.clearEditTodo = () => {
      this.setState(({ data }) => {
        const newArr = data.filter((el) => !el.edit)
        return {
          data: newArr,
        }
      })
    }

    this.createItem = (text) => ({
      description: text,
      created: 'created 1 seconds ago',
      done: false,
      edit: false,
      check: null,
      date: new Date(),
    })

    this.createDate = () => {
      this.setState(({ data }) => {
        const newData = data.map((item) => {
          const newElem = item
          newElem.created = formatDistanceToNow(item.date, { addSuffix: true, includeSeconds: true })
          return newElem
        })
        return {
          data: newData,
        }
      })
    }
  }

  UNSAFE_componentWillMount() {
    this.newTodo('Completed task')
    this.newTodo('Editing task')
    this.newTodo('Active task')
  }

  upCounter() {
    this.counter += 1
    const num = this.counter
    return num
  }

  render() {
    const { data, filterStatus } = this.state
    const todoCounter = data.filter((el) => !el.done).length

    return (
      <section className="todoapp">
        <Header newTodo={this.newTodo} createDate={this.createDate} />
        <Main
          data={data}
          createDate={this.createDate}
          filterStatus={filterStatus}
          delItem={this.delItem}
          onToggleDone={this.onToggleDone}
          editElement={this.editElement}
          clearEditTodo={this.clearEditTodo}
          newTodo={this.newTodo}
        />
        <Footer
          filtersElements={this.filtersElements}
          filterStatus={filterStatus}
          clearComplated={this.clearComplated}
          todoCounter={todoCounter}
        />
      </section>
    )
  }
}
