import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import './new-todo.css'

function NewTodo(props) {
  const [label, setLabel] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const inputTascRef = React.createRef()

  const onChangeText = (e) => {
    const { value } = e.target
    setLabel(value)
  }
  const clickEnter = (e) => {
    const { newTodo, createDate } = props
    const checkMin = min === '' ? 0 : min
    const checkSec = sec === '' ? 0 : sec
    if (e.key === 'Enter' && label !== '') {
      newTodo(label, checkMin, checkSec)
      setLabel('')
      setMin('')
      setSec('')
      createDate()
    }
  }
  const onChangeMin = (e) => {
    let { value } = e.target
    const minimum = 0
    if (value < minimum) {
      value = minimum
    }
    setMin(value)
  }
  const onChangeSec = (e) => {
    let { value } = e.target
    const { maxLength } = e.target
    const minimal = 0
    const max = 59
    if (value.length > maxLength) {
      value = value.slice(0, maxLength)
    }
    if (value < minimal) {
      value = minimal
    }
    if (value > max) {
      value = max
    }
    setSec(value)
  }

  useEffect(() => {
    inputTascRef.current.focus()
  }, [])

  const { checkMouseClick } = props
  return (
    <form className="new-todo-form" role="presentation" onClick={checkMouseClick}>
      <input
        ref={inputTascRef}
        type="text"
        className="new-todo"
        placeholder="Task"
        value={label}
        onChange={onChangeText}
        onKeyPress={clickEnter}
      />
      <input
        maxLength={3}
        type="number"
        className="new-todo-form__timer"
        placeholder="Min"
        value={min}
        onChange={onChangeMin}
        onKeyPress={clickEnter}
      />
      <input
        maxLength={2}
        type="number"
        className="new-todo-form__timer"
        placeholder="Sec"
        value={sec}
        onChange={onChangeSec}
        onKeyPress={clickEnter}
      />
    </form>
  )
}

NewTodo.propTypes = {
  newTodo: PropTypes.func,
  createDate: PropTypes.func,
}
NewTodo.defaultProps = {
  newTodo: () => {},
  createDate: () => {},
}

export default NewTodo

// export default class NewTodo extends Component {
//   constructor() {
//     super()
//     this.state = {
//       label: '',
//       min: '',
//       sec: '',
//     }

//     this.inputTascRef = React.createRef()

//     this.onChangeText = (e) => {
//       const { value } = e.target
//       this.setState({
//         label: value,
//       })
//     }
//     this.clickEnter = (e) => {
//       const { newTodo, createDate } = this.props
//       const { label, min, sec } = this.state
//       const checkMin = min === '' ? 0 : min
//       const checkSec = sec === '' ? 0 : sec
//       if (e.key === 'Enter' && label !== '') {
//         newTodo(label, checkMin, checkSec)
//         this.setState({
//           label: '',
//           min: '',
//           sec: '',
//         })
//         createDate()
//       }
//     }
//     this.onChangeMin = (e) => {
//       let { value } = e.target
//       const minimum = 0
//       // const max = 1000
//       if (value < minimum) {
//         value = minimum
//       }
//       // if (value > max) {
//       //   value = max
//       // }
//       this.setState({
//         min: value,
//       })
//     }
//     this.onChangeSec = (e) => {
//       let { value } = e.target
//       const { maxLength } = e.target
//       const min = 0
//       const max = 59
//       if (value.length > maxLength) {
//         value = value.slice(0, maxLength)
//       }
//       if (value < min) {
//         value = min
//       }
//       if (value > max) {
//         value = max
//       }
//       this.setState({
//         sec: value,
//       })
//     }
//   }

//   componentDidMount() {
//     this.inputTascRef.current.focus()
//   }

//   render() {
//     const { checkMouseClick } = this.props
//     const { label, min, sec } = this.state
//     return (
//       <form className="new-todo-form" role="presentation" onClick={checkMouseClick}>
//         <input
//           ref={this.inputTascRef}
//           type="text"
//           className="new-todo"
//           placeholder="Task"
//           value={label}
//           onChange={this.onChangeText}
//           onKeyPress={this.clickEnter}
//         />
//         <input
//           maxLength={3}
//           type="number"
//           className="new-todo-form__timer"
//           placeholder="Min"
//           value={min}
//           onChange={this.onChangeMin}
//           onKeyPress={this.clickEnter}
//         />
//         <input
//           maxLength={2}
//           type="number"
//           className="new-todo-form__timer"
//           placeholder="Sec"
//           value={sec}
//           onChange={this.onChangeSec}
//           onKeyPress={this.clickEnter}
//         />
//       </form>
//     )
//   }
// }
