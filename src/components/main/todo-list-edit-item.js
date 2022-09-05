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

// export default class TodoListEditItem extends Component {
//   constructor() {
//     super()
//     this.state = {
//       label: '',
//       editLabel: '',
//     }

//     this.inputEditRef = React.createRef()

//     this.newTextEditTask = (e) => {
//       this.setState({
//         editLabel: e.target.value,
//       })
//     }

//     this.newEditTask = (e) => {
//       const { saveEditTodo, data } = this.props
//       const { id } = data
//       const { label, editLabel } = this.state
//       if (e.key === 'Enter') {
//         saveEditTodo(editLabel, id)
//       }
//       if (e.key === 'Escape') {
//         saveEditTodo(label, id)
//       }
//       console.log(e.key)
//     }
//   }

//   componentDidMount() {
//     const { data } = this.props
//     const { description } = data
//     this.inputEditRef.current.focus()
//     this.setState({
//       label: description,
//       editLabel: description,
//     })
//   }

//   render() {
//     const { data } = this.props
//     return (
//       <input
//         ref={this.inputEditRef}
//         type="text"
//         className="edit"
//         defaultValue={data.description}
//         onChange={this.newTextEditTask}
//         onKeyDown={this.newEditTask}
//       />
//     )
//   }
// }
