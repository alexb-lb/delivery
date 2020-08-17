import React, { useState } from 'react'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'

import SvgShowPass from 'assets/images/eye.svg'

const Input = ({ name, children, onChange, value = '', type = 'text', placeholder = '', isPhoneMask, className = '' }) => {
  const [typeToggle, setPassVisibility] = useState(type)

  const handleTogglePassword = () => setPassVisibility(typeToggle === 'password' ? 'text' : 'password')

  if (isPhoneMask) {
    return (
      <div className={`form-item ${className}`}>
        {children}
        <NumberFormat
          format="(###)#######"
          mask="_"
          className="input-field"
          name={name}
          onChange={onChange}
          placeholder="(___)_______"
          value={value}
        />
      </div>
    )
  }

  return (
    <div className={`form-item ${className}`}>
      {children}
      <input
        className="input-field"
        name={name}
        onChange={onChange}
        type={typeToggle}
        placeholder={placeholder}
        value={value}
      />
      {type === 'password' && <SvgShowPass className="showPassIcon" onClick={handleTogglePassword} />}
    </div>
  )
}

export default Input

Input.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  isPhoneMask: PropTypes.bool,
  className: PropTypes.string,
}
