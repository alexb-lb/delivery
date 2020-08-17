import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { combineProductsWithQuantity } from 'utils/productsUtil'
import { setProductsListScrollOffset, clearProductsSearch } from 'redux/actions/productsActions'
import { addProductToCart, removeProductFromCart, getProductsBySearch } from 'redux/actions/productsActions'
import pages from 'dictionaries/pages'

import ButtonPriceTotal from 'components/buttonPriceTotal/buttonPriceTotal'
import ProductsList from 'components/productsList/productsList'
import NotFound from 'components/notFound/notFound'
import ButtonBack from 'components/buttonBack/buttonBack'

const SearchResults = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { searchProductsList, cartProductsList, cartProductsPriceTotal, cartProductsAmount, scrollOffset, search } = useSelector(({ products }) => products)
  const { id: isUserHasActiveOrder } = useSelector(({ orders }) => orders.lastActiveOrder)

  useEffect(() => {
    dispatch(getProductsBySearch(search))
  }, [dispatch, search])

  const goProductDetailsPage = (category, subCategory, productId) => {
    history.push(`${pages.products.url}/${category}/${subCategory}/${productId}`)
  }
  const handleClickBack = () => dispatch(clearProductsSearch())

  let addToCart = null, removeFromCart = null, goCartPage = null
  if (!isUserHasActiveOrder) {
    addToCart = (id) => dispatch(addProductToCart(id))
    removeFromCart = (id, price) => dispatch(removeProductFromCart(id, price))
    goCartPage = () => history.push(`${pages.cart.url}`)
  }
  const setScrollOffset = (scrollOffset) => dispatch(setProductsListScrollOffset(scrollOffset))

  const products = combineProductsWithQuantity(searchProductsList, cartProductsList)

  return (
    <div className="search-modal">
      <div className="breadcrumbs-container">
        <ButtonBack onClick={handleClickBack} />
        <div className="routes">
          <div className="route active">
            {pages.search.titleRu}
          </div>
        </div>
      </div>
      {searchProductsList.length === 0
        ? <NotFound />
        : <ProductsList
          products={products}
          goProductDetailsPage={goProductDetailsPage}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          scrollOffset={scrollOffset}
          setScrollOffset={setScrollOffset}
          isInfinityScroll
        />
      }
      {cartProductsAmount > 0 &&
        <div className="btn-price-container">
          <ButtonPriceTotal
            price={cartProductsPriceTotal}
            amount={cartProductsAmount}
            className='btn-price-container'
            handleClick={goCartPage}
          />
        </div>
      }
    </div>
  )
}

export default SearchResults
