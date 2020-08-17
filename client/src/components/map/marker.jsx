import React from 'react'
import PropTypes from 'prop-types'

import SvgMarker from 'assets/images/markerShop.svg'

const Marker = ({ id, name, onClick = null }) => {
  const handleMarkerClick = () => onClick(id)

  return (
    <div className="map-marker" alt={name} onClick={handleMarkerClick}>
      <SvgMarker className="marker-icon" />
    </div>
  )
}

export default Marker

Marker.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

