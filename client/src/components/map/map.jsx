import React from 'react'
import PropTypes from 'prop-types'
import GoogleMap from 'google-map-react'

import Marker from './marker'

const Map = ({ places = [], onMarkerClick = null }) => {

  return (
    <GoogleMap
      className="map"
      bootstrapURLKeys={{ key: process.env.GOOGLE_API_KEY }}
      defaultZoom={11}
      defaultCenter={{ lat: 50.4501, lng: 30.5234 }}
      yesIWantToUseGoogleMapApiInternals
    >
      {places.length > 0 && places.map(({ id, name, lat, lng }) => {
        return <Marker key={id} id={id} name={name} lat={lat} lng={lng} onClick={onMarkerClick} />
      })}
    </GoogleMap>
  )
}

export default Map

Map.propTypes = {
  places: PropTypes.array,
  onMarkerClick: PropTypes.func,
}

