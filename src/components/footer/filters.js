import React from 'react'
import PropTypes from 'prop-types'

import FilterBtn from './filters-btn'

function Filters({ props }) {
  const { filtersElements, filterStatus } = props
  const buttons = ['All', 'Active', 'Completed']
  const id = 200
  const elements = buttons.map((item) => (
    <li key={id + 1}>
      <FilterBtn text={item} filterName={filterStatus} filtersElements={filtersElements} />
    </li>
  ))
  return <ul className="filters">{elements}</ul>
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
