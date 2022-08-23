import React, { Component } from 'react'

export default class TodoListEditItem extends Component {
  constructor() {
    super()
    this.state = {
      label: '',
      editLabel: '',
    }

    this.inputEditRef = React.createRef()

    this.newTextEditTask = (e) => {
      this.setState({
        editLabel: e.target.value,
      })
    }

    this.newEditTask = (e) => {
      const { saveEditTodo, data } = this.props
      const { id } = data
      const { label, editLabel } = this.state
      if (e.key === 'Enter') {
        // newTodo(label)
        // clearEditTodo()
        // createDate()
        saveEditTodo(editLabel, id)
      }
      if (e.key === 'Escape') {
        saveEditTodo(label, id)
      }
      console.log(e.key)
    }

    // this.checkMouseClick = (e) => {
    //   console.log(e.target)
    //   const { saveEditTodo, data } = this.props
    //   const { id } = data
    //   const { label } = this.state
    //   const { target } = e
    //   if (target.classList.contains('edit')) {
    //     console.log('true')
    //     saveEditTodo(label, id)
    //   }
    // }
  }

  //   componentDidUpdate(prevProps, prevState) {
  //     const { data } = this.props
  //     const { edit } = data
  //     if (prevState.edit !== edit) {
  //       this.inputEditRef.current.focus()
  //     }
  //   }

  componentDidMount() {
    const { data } = this.props
    const { description } = data
    this.inputEditRef.current.focus()
    this.setState({
      label: description,
    })
  }

  render() {
    const { data } = this.props
    return (
      <input
        ref={this.inputEditRef}
        type="text"
        className="edit"
        defaultValue={data.description}
        onChange={this.newTextEditTask}
        onKeyDown={this.newEditTask}
        // onClick={this.checkMouseClick}
      />
    )
  }
}
