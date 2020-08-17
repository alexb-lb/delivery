import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const NavigationItem = ({ children, name, link }) => {
  return (
    <li className="navigation-item">
      <NavLink to={link} className="link">
        {children}
        <p className="title">{name}</p>
      </NavLink>
    </li>
  )
}

NavigationItem.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
}

export default NavigationItem
