import React from 'react'
import PropTypes from 'prop-types'

import FilterBtn from './filters-btn'

function Filters(props) {
  const { filtersElements, filterStatus } = props
  const buttons = ['All', 'Active', 'Completed']
  let id = 200
  const elements = buttons.map((item) => (
    <li key={id++}>
      <FilterBtn props={item} filterName={filterStatus} />
    </li>
  ))
  return (
    <ul className="filters" onClick={filtersElements}>
      {elements}
    </ul>
  )
}

Filters.propTypes = {
  filterStatus: PropTypes.string,
  filtersElements: PropTypes.func,
}
Filters.defaultProps = {
  filterStatus: 'all',
  filtersElements: () => {},
}

export default Filters
