import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FixedSizeList as List } from 'react-window'

import ProductItem, { ITEM_HEIGHT } from 'components/productItem/productItem'
import pages from 'dictionaries/pages'

const ProductsList = (props) => {
  const history = useHistory()

  const {
    products, addToCart = null, removeFromCart = null, toggleFavorites = null, hideIfZeroQuantity = false, isShowRemoveIcon = false,
    scrollOffset = 0, setScrollOffset = null, isInfinityScroll = false
  } = props

  const goProductDetailsPage = (category, subCategory, productId) => {
    history.push(`${pages.products.url}/${category}/${subCategory}/${productId}`)
  }

  const getProductId = (i) => products[i].id

  const getHeight = () => {
    const maxHeight = ITEM_HEIGHT * products.length
    const viewHeight = window.innerHeight

    return isInfinityScroll && maxHeight > viewHeight ? viewHeight : maxHeight
  }

  const handleScroll = (scrollProps) => {
    if (setScrollOffset && scrollProps.scrollOffset > 0) {
      setScrollOffset(scrollProps.scrollOffset)
    }
  }

  const rowRenderer = (item) => (
    <div style={item.style}>
      <ProductItem
        {...products[item.index]}
        goProductDetailsPage={goProductDetailsPage}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        toggleFavorites={toggleFavorites}
        hideIfZeroQuantity={hideIfZeroQuantity}
        isShowRemoveIcon={isShowRemoveIcon}
      />
    </div>
  )

  return (
    <List
      className='products-list'
      height={getHeight()}
      itemCount={products.length}
      itemSize={ITEM_HEIGHT}
      rowRenderer={rowRenderer}
      itemKey={getProductId}
      initialScrollOffset={scrollOffset}
      onScroll={handleScroll}
    >
      {rowRenderer}
    </List>
  )
}

export default ProductsList

ProductsList.propTypes = {
  products: PropTypes.array.isRequired,
  addToCart: PropTypes.func,
  removeFromCart: PropTypes.func,
  toggleFavorites: PropTypes.func,
  scrollOffset: PropTypes.number,
  setScrollOffset: PropTypes.func,
  hideIfZeroQuantity: PropTypes.bool,
  isShowRemoveIcon: PropTypes.bool,
  isInfinityScroll: PropTypes.bool,
}
