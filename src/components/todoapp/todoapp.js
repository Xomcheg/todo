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

  const setTimerStatus = (id) => {
    console.log('setTimerStatus', id)
    const idx = data.findIndex((el) => el.id === id)
    const oldItem = data[idx]
    const newItem = { ...oldItem, timerStatus: !oldItem.timerStatus }
    const newArr = [...data.slice(0, idx), newItem, ...data.slice(idx + 1)]
    setData(newArr)
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
          setTimerStatus={setTimerStatus}
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
