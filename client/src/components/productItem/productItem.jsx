import React from 'react'
import PropTypes from 'prop-types'

import SvgAddToFavorites from 'assets/images/heart.svg'
import SvgAddToCart from 'assets/images/plusInCircle.svg'
import SvgMinus from 'assets/images/minusInCircle.svg'
import SvgDeleteFromCart from 'assets/images/trashBin.svg'

export const ITEM_HEIGHT = 105.5 // height of element must be changed via this constant, due to it used in /components/productsList/productsList.jsx

const ProductItem = (props) => {
  const { id, image, nameRu, price, currencyRu, categoryName, subCategoryName, quantity, isFavorite,
    goProductDetailsPage, addToCart, removeFromCart, toggleFavorites, hideIfZeroQuantity, isShowRemoveIcon
  } = props

  const handleToggleFavorites = () => toggleFavorites(id)
  const handleAddToCart = () => addToCart(id)
  const handleRemoveFromCart = () => removeFromCart(id)

  const handleGoProductPage = () => goProductDetailsPage(categoryName, subCategoryName, id)

  if (hideIfZeroQuantity && quantity === 0) return null

  return (
    <div className="product-item" style={{ height: ITEM_HEIGHT }}>
      {toggleFavorites &&
        <div className="favorites-container" onClick={handleToggleFavorites}>
          <SvgAddToFavorites className={`addToFavoritesIcon ${isFavorite ? 'active' : ''}`} />
        </div>
      }
      <div className="photo" style={{ backgroundImage: `url(https://prostomarkets.com${image})` }} onClick={handleGoProductPage} />
      <div className="title" onClick={handleGoProductPage}>
        {nameRu}
      </div>
      <div className="price">
        {price}<br></br>({currencyRu})
      </div>
      {addToCart &&
        <div className="add-to-cart-container" onClick={handleAddToCart}>
          <SvgAddToCart className="addToCartIcon" />
        </div>
      }
      {removeFromCart && quantity > 0 &&
        <>
          <div className="delete-from-cart-container" onClick={handleRemoveFromCart}>
            {isShowRemoveIcon && quantity === 1
              ? <SvgDeleteFromCart className="deleteFromCartIcon" />
              : <SvgMinus className="minusIcon" />
            }
          </div>
        </>
      }
      {quantity > 0 && <div className="amount">{quantity}x</div>}
    </div >
  )
}

ProductItem.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  nameRu: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currencyRu: PropTypes.string.isRequired,
  categoryName: PropTypes.string.isRequired,
  subCategoryName: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  quantity: PropTypes.number.isRequired,
  goProductDetailsPage: PropTypes.func.isRequired,
  addToCart: PropTypes.func,
  removeFromCart: PropTypes.func,
  toggleFavorites: PropTypes.func,
  hideIfZeroQuantity: PropTypes.bool,
  isShowRemoveIcon: PropTypes.bool,
}

export default ProductItem
