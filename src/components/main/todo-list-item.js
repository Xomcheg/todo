import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import './todo-list-item.css'

function TodoListItem(props) {
  const [sec, setSec] = useState(0)

  const [timerStatus, setTimerStatus] = useState(false)
  const [timerId, setTimerId] = useState(null)

  const displayMin = Math.floor(sec / 60)
  const displaySec = sec - displayMin * 60
  function useTimer() {
    setSec((currentSec) => currentSec + 1)
  }

  const start = () => {
    setTimerStatus(true)
  }

  const stop = () => {
    clearInterval(timerId)
    setTimerId(null)
    setTimerStatus(false)
  }
  const clickDone = () => {
    const { onToggleDone } = props
    stop()
    onToggleDone()
  }

  useEffect(() => {
    if (timerStatus) {
      const timerIds = setInterval(() => useTimer(), 1000)
      setTimerId(timerIds)
    }
    return () => {
      clearInterval(timerId)
    }
  }, [timerStatus])

  useEffect(() => {
    const { data } = props
    const { minutes, seconds } = data
    const time = Number(minutes) * 60 + Number(seconds)
    setSec(time)
  }, [])
  const { data, delItem, onToggleDone, editElement } = props
  const { description, created, id, check } = data
  return (
    <div className="view">
      <input className="toggle" type="checkbox" id={id} defaultChecked={check} onClick={clickDone} />
      <label htmlFor={id}>
        <span className="title">{description}</span>
        <span className="description">
          <button type="button" className="icon icon-play" onClick={start}>
            {' '}
          </button>
          <button type="button" className="icon icon-pause" onClick={stop}>
            {' '}
          </button>
          &nbsp; {displayMin < 10 ? `0${displayMin}` : `${displayMin}`}:
          {displaySec < 10 ? `0${displaySec}` : `${displaySec}`}
        </span>
        <span className="description">{created}</span>
      </label>
      <button type="button" className="icon icon-edit" onClick={editElement}>
        {' '}
      </button>
      <button type="button" className="icon icon-destroy" onClick={delItem}>
        {' '}
      </button>
    </div>
  )
}

TodoListItem.propTypes = {
  delItem: PropTypes.func,
  onToggleDone: PropTypes.func,
  editElement: PropTypes.func,
}

TodoListItem.defaultProps = {
  delItem: () => {},
  onToggleDone: () => {},
  editElement: () => {},
}

export default TodoListItem
// export default class TodoListItem extends Component {
//   constructor() {
//     super()
//     this.timer = null

//     this.state = {
//       min: '',
//       sec: '',
//       timerStatus: '',
//     }

//     this.timer = () => {
//       const { data, getItemTimerData } = this.props
//       const { id } = data
//       const { sec, min } = this.state
//       let newMin = Number(min)
//       let newSec = Number(sec) + 1
//       if (newSec === 60) {
//         newSec = 0
//         newMin += 1
//       }
//       this.setState({
//         sec: newSec,
//         min: newMin,
//       })
//       getItemTimerData(id, newSec, newMin)
//     }

//     this.start = (e) => {
//       const { timerStatus } = this.state
//       if (e.target.classList.contains('icon-play') && !timerStatus) {
//         this.setState({
//           timerStatus: true,
//         })
//         this.timerId = setInterval(this.timer.bind(this), 1000)
//       }
//     }

//     this.stop = () => {
//       clearInterval(this.timerId)
//       this.setState({
//         timerStatus: false,
//       })
//     }

//     this.clickEdit = () => {
//       const { editElement } = this.props
//       this.stop()
//       editElement()
//     }
//     this.clickDone = () => {
//       const { onToggleDone } = this.props
//       if (this.timer) {
//         this.stop()
//       }
//       onToggleDone()
//     }
//   }

//   UNSAFE_componentWillMount() {
//     const { data } = this.props
//     const { edit, minutes, seconds, timerStatus: firstTimerStatus } = data
//     const minutesInSeconds = Math.floor(Number(seconds) / 60)
//     const resultMin = Number(minutes) + minutesInSeconds
//     const resultSec = Number(seconds) - minutesInSeconds * 60
//     if (edit) {
//       clearInterval(this.timerId)
//     }
//     this.setState({
//       min: resultMin,
//       sec: resultSec,
//       timerStatus: firstTimerStatus,
//     })
//   }

//   render() {
//     const { min, sec } = this.state
//     const { data, delItem, checkMouseClick } = this.props
//     const { description, created, id, check } = data

//     return (
//       <div className="view" role="presentation" onClick={checkMouseClick}>
//         <input className="toggle" type="checkbox" id={id} defaultChecked={check} onClick={this.clickDone} />
//         <label htmlFor={id}>
//           <span className="title">{description}</span>
//           <span className="description">
//             <button type="button" className="icon icon-play" onClick={this.start}>
//               {' '}
//             </button>
//             <button type="button" className="icon icon-pause" onClick={this.stop}>
//               {' '}
//             </button>
//             &nbsp; {min < 10 ? `0${min}` : `${min}`}:{sec < 10 ? `0${sec}` : `${sec}`}
//           </span>
//           {/* <span className="description">{description}</span> */}
//           <span className="description">{created}</span>
//         </label>
//         <button type="button" className="icon icon-edit" onClick={this.clickEdit}>
//           {' '}
//         </button>
//         <button type="button" className="icon icon-destroy" onClick={delItem}>
//           {' '}
//         </button>
//       </div>
//     )
//   }
// }
