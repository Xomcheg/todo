import React from 'react'
import PropTypes from 'prop-types'

const FilterBtn = (props) => {
  const { props: text, filterName } = props
  let select = ''
  if (text.toLowerCase() === filterName) {
    select = 'selected'
  }

  return <button className={select}>{text}</button>
}

FilterBtn.propTypes = {
  filterStatus: PropTypes.string,
  filtersElements: PropTypes.func,
}
FilterBtn.defaultProps = {
  filterStatus: 'Button',
  filtersElements: () => {},
}

export default FilterBtn
