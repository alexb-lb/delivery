import React from 'react'
import PropTypes from 'prop-types'

import CartAmount from 'components/cartAmount/cartAmount'

const ProductDetails = props => {
  const { id, nameRu, image, price, currencyRu, amountInCart, addToCart = null, description } = props

  const handleAddToCartClick = () => addToCart(id)

  return (
    <div className="product-details">
      <div className="title">
        {nameRu}
      </div>
      <div className="photo">
        <img src={image} alt={nameRu} />
      </div>
      <div className="price">{price}{currencyRu}</div>
      {description &&
        <div className="info">
          {description}
        </div>
      }
      {addToCart &&
        <div className="add-to-cart" onClick={handleAddToCartClick}>
          <CartAmount amount={amountInCart} className="cart-amount" />
        </div>
      }
    </div>
  )
}

ProductDetails.propTypes = {
  id: PropTypes.number.isRequired,
  nameRu: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currencyRu: PropTypes.string.isRequired,
  amountInCart: PropTypes.number.isRequired,
  addToCart: PropTypes.func,
  description: PropTypes.string,
}

export default ProductDetails
