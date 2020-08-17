import React from 'react'
import PropTypes from 'prop-types'

import SvgBasket from 'assets/images/basket.svg'


const CartAmount = ({ amount, className = '' }) => {
  return (
    <div className={`basket ${className}`}>
      <SvgBasket className="basketIcon" />
      <div className="amount">{amount}</div>
    </div>
  )
}

export default CartAmount

CartAmount.propTypes = {
  amount: PropTypes.number.isRequired,
  className: PropTypes.string,
}
