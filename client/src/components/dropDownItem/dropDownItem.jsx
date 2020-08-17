import React from 'react'
import PropTypes from 'prop-types'

import SvgArrowDown from 'assets/images/arrowDown.svg'

const DropDownItem = ({ children, title, onClick = null, total = null, name = '', value = '' }) => {
  const handleClick = () => onClick(total, title, name)

  return (
    <div className="drop-down-item" onClick={handleClick} data-name={name}>
      {children}
      <div className="drop-down-title">{title} {value}</div>
      <SvgArrowDown className="arrow-down-icon" />
    </div>
  )
}

export default DropDownItem

DropDownItem.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  total: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}

