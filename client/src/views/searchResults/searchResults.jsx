import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

import { combineProductsWithQuantity } from 'utils/productsUtil'
import { setProductsListScrollOffset } from 'redux/actions/productsActions'
import { addProductToCart, removeProductFromCart, getProductsBySearch } from 'redux/actions/productsActions'
import { setLastSearch } from 'redux/actions/searchActions'

import ButtonPriceTotal from 'components/buttonPriceTotal/buttonPriceTotal'

import pages from 'dictionaries/pages'
import ProductsList from 'components/productsList/productsList'
import historyService from 'services/historyService'
import NotFound from 'components/notFound/notFound'

const SearchResults = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  const { productsList, cartProductsList, cartProductsPriceTotal, cartProductsAmount, scrollOffset } = useSelector(({ products }) => products)
  const { id: isUserHasActiveOrder } = useSelector(({ orders }) => orders.lastActiveOrder)
  const { lastSearch } = useSelector(({ search }) => search)

  useEffect(() => {
    if (location.search !== lastSearch) {
      const { products } = historyService.getSearchParams()

      dispatch(setLastSearch(products))
      dispatch(getProductsBySearch(products))
    }
  }, [dispatch, lastSearch, location.search])

  const goProductDetailsPage = (category, subCategory, productId) => {
    history.push(`${pages.products.url}/${category}/${subCategory}/${productId}`)
  }

  let addToCart = null, removeFromCart = null, goCartPage = null
  if (!isUserHasActiveOrder) {
    addToCart = (id) => dispatch(addProductToCart(id))
    removeFromCart = (id, price) => dispatch(removeProductFromCart(id, price))
    goCartPage = () => history.push(`${pages.cart.url}`)
  }
  const setScrollOffset = (scrollOffset) => dispatch(setProductsListScrollOffset(scrollOffset))

  const products = combineProductsWithQuantity(productsList, cartProductsList)

  return (
    <div className="products-container">
      {productsList.length === 0
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
      {cartProductsAmount > 0
        && <ButtonPriceTotal
          price={cartProductsPriceTotal}
          amount={cartProductsAmount}
          className='btn-price-container'
          handleClick={goCartPage}
        />
      }
    </div>
  )
}

export default SearchResults
