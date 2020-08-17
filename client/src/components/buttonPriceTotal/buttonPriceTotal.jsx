import React from 'react'
import PropTypes from 'prop-types'

import CartAmount from 'components/cartAmount/cartAmount'

const ButtonPriceTotal = ({ price, amount, className, handleClick, message = '', currency = 'грн' }) => {
  const text = `${price} ${currency}. ${message}`

  return (
    <div className={className} onClick={handleClick}>
      <button className="btn-price-total">
        {!message && <CartAmount amount={amount} />}
        {text}
      </button>
    </div>
  )
}

export default ButtonPriceTotal

ButtonPriceTotal.propTypes = {
  price: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  handleClick: PropTypes.func,
  className: PropTypes.string,
  message: PropTypes.string,
  currency: PropTypes.string,
}
