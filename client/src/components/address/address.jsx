import React from 'react'
import PropTypes from 'prop-types'

import SvgAddress from 'assets/images/markerAddress.svg'

const Address = ({ id, address, title, onClick = null }) => {
  const handleClick = () => onClick(id, address)

  return (
    <div className="address-container" onClick={handleClick}>
      {title && <div className="title">{title}</div>}
      <div className="location">
        <SvgAddress className="address-icon" />
        <p>{address}</p>
      </div>
    </div>
  )
}

export default Address

Address.propTypes = {
  address: PropTypes.string.isRequired,
  id: PropTypes.number,
  title: PropTypes.string,
  onClick: PropTypes.func,
}
