import React from 'react'

import TodoList from './todo-list'
import './main.css'

function Main(props) {
  return (
    <section className="main">
      <TodoList {...props} />
    </section>
  )
}
export default Main
// export default class Main extends Component {
//   render() {
//     const data = this.props
//     return (
//       <section className="main">
//         <TodoList {...data} />
//       </section>
//     )
//   }
// }