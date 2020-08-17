import React from 'react'
import PropTypes from 'prop-types'

const HeaderUser = ({ user }) => {
  const { image = '', name } = user

  return (
    <>
      <div className="photo" style={{ backgroundImage: `url(${image})` }}></div>
      <div className="name">{name}</div>
    </>
  )
}

HeaderUser.propTypes = {
  user: PropTypes.object.isRequired,
}

export default HeaderUser
