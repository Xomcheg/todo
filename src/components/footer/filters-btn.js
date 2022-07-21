import React from 'react'

const FilterBtn = (props) => {
  const { props: text, filterName } = props
  let select = ''
  if (text.toLowerCase() === filterName) {
    select = 'selected'
  }

  return <button className={select}>{text}</button>
}

export default FilterBtn
