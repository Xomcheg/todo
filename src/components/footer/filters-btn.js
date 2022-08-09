import React from 'react'
import PropTypes from 'prop-types'

function FilterBtn(props) {
  const { text, filterName, filtersElements } = props
  let select = ''
  if (text.toLowerCase() === filterName) {
    select = 'selected'
  }
  return (
    <button type="button" className={select} onClick={filtersElements}>
      {text}
    </button>
  )
}

FilterBtn.propTypes = {
  filterName: PropTypes.string,
}
FilterBtn.defaultProps = {
  filterName: 'Button',
}

export default FilterBtn
