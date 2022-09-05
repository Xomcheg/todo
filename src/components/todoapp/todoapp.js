import React, { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

import Header from '../header'
import Main from '../main'
import Footer from '../footer'

import './todoapp.css'

function App() {
  const [data, setData] = useState([])
  const [filterStatus, setFilterStatus] = useState('all')
  const [counter, setCounter] = useState(100)

  const filtersElements = (e) => {
    const { target } = e
    if (target.nodeName === 'BUTTON') {
      setFilterStatus(target.textContent.toLowerCase())
    }
  }

  const createItem = (text, min = 0, sec = 0) => ({
    description: text,
    minutes: min,
    seconds: sec,
    timerStatus: false,
    created: 'created 1 seconds ago',
    done: false,
    edit: false,
    check: null,
    date: new Date(),
  })

  const editElement = (id) => {
    setData((counterData) => {
      const idx = counterData.findIndex((el) => el.id === id)
      const oldItem = counterData[idx]
      const newItem = { ...oldItem, edit: !oldItem.edit, done: false }
      const newArr = [...counterData.slice(0, idx), newItem, ...counterData.slice(idx + 1)]
      return newArr
    })
  }

  const clearComplated = () => {
    const newArr = data.filter((el) => !el.done)
    setData(newArr)
  }

  const onToggleDone = (id) => {
    const idx = data.findIndex((el) => el.id === id)
    const oldItem = data[idx]
    const newItem = { ...oldItem, done: !oldItem.done, check: !oldItem.check }
    const newArr = [...data.slice(0, idx), newItem, ...data.slice(idx + 1)]
    setData(newArr)
  }

  const delItem = (id) => {
    const idx = data.findIndex((el) => el.id === id)
    const newArr = [...data.slice(0, idx), ...data.slice(idx + 1)]
    setData(newArr)
  }

  const newTodo = (text, min, sec, itemKey) => {
    const newItem = createItem(text, min, sec)
    if (itemKey === undefined) {
      newItem.id = counter + 1
    } else {
      newItem.id = itemKey
    }
    setCounter((currentCounter) => currentCounter + 1)
    setData((currentData) => [newItem, ...currentData])
  }

  const saveEditTodo = (text, id) => {
    const idx = data.findIndex((el) => el.id === id)
    const oldElem = data[idx]
    const newElem = { ...oldElem, description: text, edit: false, done: false, check: false }
    const newArr = [...data.slice(0, idx), newElem, ...data.slice(idx + 1)]
    setData(newArr)
  }

  const createDate = () => {
    setData((currentData) => {
      const newData = currentData.map((item) => {
        const newElem = item
        newElem.created = formatDistanceToNow(item.date, { addSuffix: true, includeSeconds: true })
        return newElem
      })
      return newData
    })
  }

  const checkTimerButtonBtn = (id) => {
    const idx = data.findIndex((el) => el.id === id)
    const oldElem = data[idx]
    const newElem = { ...oldElem, timerStatus: !oldElem.timerStatus }
    const newArr = [...data.slice(0, idx), newElem, ...data.slice(idx + 1)]
    setData(newArr)
  }

  // если пользователь кликнул по пустой области то отменяю редактирование элеменотов и возвращаю изначальный текст задачи
  const checkMouseClick = (e) => {
    const { target } = e
    if (!target.classList.contains('edit')) {
      setData((counterData) => {
        const newData = counterData.map((el) => {
          const newEl = el
          newEl.edit = false
          return newEl
        })
        return newData
      })
    }
  }
  // Получаем данные таймера от элемента и записываем их в data по id
  // чтобы обновлять данные после того как таймер запущем и пользователь нажал кнопку edit
  // таймер паузится и данные записываются в общий объект
  const getItemTimerData = (id, sec, min) => {
    setData((counterData) => {
      const idx = counterData.findIndex((el) => el.id === id)
      const oldElem = counterData[idx]
      const newElem = { ...oldElem, minutes: min, seconds: sec }
      const newArr = [...counterData.slice(0, idx), newElem, ...counterData.slice(idx + 1)]
      return newArr
    })
  }

  useEffect(() => {
    newTodo('Completed task', 0, 0, 101)
    newTodo('Editing task', 0, 0, 102)
    newTodo('Active task', 0, 0, 103)
  }, [])

  const todoCounter = data.filter((el) => !el.done).length

  return (
    <>
      <div className="overlay" role="presentation" onClick={checkMouseClick} />
      <section className="todoapp">
        <Header newTodo={newTodo} createDate={createDate} checkMouseClick={checkMouseClick} />
        <Main
          data={data}
          createDate={createDate}
          filterStatus={filterStatus}
          delItem={delItem}
          onToggleDone={onToggleDone}
          editElement={editElement}
          newTodo={newTodo}
          checkTimerButtonBtn={checkTimerButtonBtn}
          saveEditTodo={saveEditTodo}
          getItemTimerData={getItemTimerData}
        />
        <Footer
          filtersElements={filtersElements}
          filterStatus={filterStatus}
          clearComplated={clearComplated}
          todoCounter={todoCounter}
        />
      </section>
    </>
  )
}

export default App
// import React, { Component } from 'react'
// import { formatDistanceToNow } from 'date-fns'

// import Header from '../header'
// import Main from '../main'
// import Footer from '../footer'

// import './todoapp.css'

// export default class App extends Component {
//   constructor() {
//     super()
//     this.counter = 100

//     this.state = {
//       data: [],
//       filterStatus: 'all',
//     }

//     this.filtersElements = (e) => {
//       const { target } = e
//       if (target.nodeName === 'BUTTON') {
//         this.setState({
//           filterStatus: target.textContent.toLowerCase(),
//         })
//       }
//     }

//     this.editElement = (id) => {
//       this.setState(({ data }) => {
//         const idx = data.findIndex((el) => el.id === id)
//         const oldItem = data[idx]
//         const newItem = { ...oldItem, edit: !oldItem.edit, done: false }
//         const newArr = [...data.slice(0, idx), newItem, ...data.slice(idx + 1)]
//         return {
//           data: newArr,
//         }
//       })
//     }

//     this.clearComplated = () => {
//       this.setState(({ data }) => {
//         const newArr = data.filter((el) => !el.done)
//         return {
//           data: newArr,
//         }
//       })
//     }

//     this.onToggleDone = (id) => {
//       this.setState(({ data }) => {
//         const idx = data.findIndex((el) => el.id === id)
//         const oldItem = data[idx]
//         const newItem = { ...oldItem, done: !oldItem.done, check: !oldItem.check }
//         const newArr = [...data.slice(0, idx), newItem, ...data.slice(idx + 1)]
//         return {
//           data: newArr,
//         }
//       })
//     }

//     this.delItem = (id) => {
//       this.setState(({ data }) => {
//         const idx = data.findIndex((el) => el.id === id)
//         const newArr = [...data.slice(0, idx), ...data.slice(idx + 1)]
//         return {
//           data: newArr,
//         }
//       })
//     }

//     this.newTodo = (text, min, sec) => {
//       const newItem = this.createItem(text, min, sec)
//       newItem.id = this.upCounter()
//       this.setState(({ data }) => {
//         const newArr = [newItem, ...data]
//         return {
//           data: newArr,
//         }
//       })
//     }

//     this.saveEditTodo = (text, id) => {
//       this.setState(({ data }) => {
//         const idx = data.findIndex((el) => el.id === id)
//         const oldElem = data[idx]
//         const newElem = { ...oldElem, description: text, edit: false, done: false, check: false }
//         const newArr = [...data.slice(0, idx), newElem, ...data.slice(idx + 1)]
//         return {
//           data: newArr,
//         }
//       })
//     }

//     this.createItem = (text, min = 0, sec = 0) => ({
//       description: text,
//       minutes: min,
//       seconds: sec,
//       timerStatus: false,
//       created: 'created 1 seconds ago',
//       done: false,
//       edit: false,
//       check: null,
//       date: new Date(),
//     })

//     this.createDate = () => {
//       this.setState(({ data }) => {
//         const newData = data.map((item) => {
//           const newElem = item
//           newElem.created = formatDistanceToNow(item.date, { addSuffix: true, includeSeconds: true })
//           return newElem
//         })
//         return {
//           data: newData,
//         }
//       })
//     }

//     this.checkTimerButtonBtn = (id) => {
//       this.setState(({ data }) => {
//         const idx = data.findIndex((el) => el.id === id)
//         const oldElem = data[idx]
//         const newElem = { ...oldElem, timerStatus: !oldElem.timerStatus }
//         const newArr = [...data.slice(0, idx), newElem, ...data.slice(idx + 1)]
//         return {
//           data: newArr,
//         }
//       })
//     }

//     // если пользователь кликнул по пустой области то отменяю редактирование элеменотов и возвращаю изначальный текст задачи
//     this.checkMouseClick = (e) => {
//       const { target } = e
//       if (!target.classList.contains('edit')) {
//         this.setState(({ data }) => {
//           const newData = data.map((el) => {
//             const newEl = el
//             newEl.edit = false
//             return newEl
//           })
//           return {
//             data: newData,
//           }
//         })
//       }
//     }
//     // Получаем данные таймера от элемента и записываем их в data по id
//     // чтобы обновлять данные после того как таймер запущем и пользователь нажал кнопку edit
//     // таймер паузится и данные записываются в общий объект
//     this.getItemTimerData = (id, sec, min) => {
//       this.setState(({ data }) => {
//         const idx = data.findIndex((el) => el.id === id)
//         const oldElem = data[idx]
//         const newElem = { ...oldElem, minutes: min, seconds: sec }
//         const newArr = [...data.slice(0, idx), newElem, ...data.slice(idx + 1)]
//         return {
//           data: newArr,
//         }
//       })
//     }
//   }

//   UNSAFE_componentWillMount() {
//     this.newTodo('Completed task')
//     this.newTodo('Editing task')
//     this.newTodo('Active task')
//   }

//   upCounter() {
//     this.counter += 1
//     const num = this.counter
//     return num
//   }

//   render() {
//     const { data, filterStatus } = this.state
//     const todoCounter = data.filter((el) => !el.done).length

//     return (
//       <>
//         <div className="overlay" role="presentation" onClick={this.checkMouseClick} />
//         <section className="todoapp">
//           <Header newTodo={this.newTodo} createDate={this.createDate} checkMouseClick={this.checkMouseClick} />
//           <Main
//             data={data}
//             createDate={this.createDate}
//             filterStatus={filterStatus}
//             delItem={this.delItem}
//             onToggleDone={this.onToggleDone}
//             editElement={this.editElement}
//             clearEditTodo={this.clearEditTodo}
//             newTodo={this.newTodo}
//             checkTimerButtonBtn={this.checkTimerButtonBtn}
//             saveEditTodo={this.saveEditTodo}
//             getItemTimerData={this.getItemTimerData}
//           />
//           <Footer
//             filtersElements={this.filtersElements}
//             filterStatus={filterStatus}
//             clearComplated={this.clearComplated}
//             todoCounter={todoCounter}
//           />
//         </section>
//       </>
//     )
//   }
// }
