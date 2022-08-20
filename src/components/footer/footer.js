import React from 'react'
import PropTypes from 'prop-types'

import Filters from './filters'
import './footer.css'

function Footer(props) {
  const { clearComplated, todoCounter } = props
  return (
    <footer className="footer">
      <span className="todo-count">
        {todoCounter}
        items left
      </span>
      <Filters props={props} />
      <button type="button" className="clear-completed" onClick={clearComplated}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  todoCounter: PropTypes.number,
  clearComplated: PropTypes.func,
}

Footer.defaultProps = {
  todoCounter: 0,
  clearComplated: () => {},
}
export default Footer
