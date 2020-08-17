import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import pages from 'dictionaries/pages'
import historyService from 'services/historyService'
import { combineProductsWithQuantity, combineProductsWithFavorites } from 'utils/productsUtil'
import { getUrl, getCurrentProductsPage } from 'utils/urlUtil'
import { getProductsByCategory, getProductsBySubcategory, clearProducts, setProductsListScrollOffset } from 'redux/actions/productsActions'
import { toggleFavoriteProduct } from 'redux/actions/favoritesActions'
import { getCategoryInfo, clearCategoryInfo } from 'redux/actions/categoriesActions'
import { addProductToCart, removeProductFromCart } from 'redux/actions/productsActions'

import ButtonPriceTotal from 'components/buttonPriceTotal/buttonPriceTotal'
import ProductsList from 'components/productsList/productsList'

const CategoryProducts = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { isAuthenticated } = useSelector(({ user }) => user)
  const { productsList, cartProductsList, cartProductsPriceTotal, cartProductsAmount, scrollOffset } = useSelector(({ products }) => products)
  const { productsList: favoriteProductsList } = useSelector(({ favorites }) => favorites)
  const { id: isUserHasActiveOrder } = useSelector(({ orders }) => orders.lastActiveOrder)

  const currentPage = getCurrentProductsPage()
  const isFavoritesPage = currentPage.categoryName === pages.favorites.name

  let products = productsList
  if (isFavoritesPage) {
    products = currentPage.subCategoryName
      ? favoriteProductsList.filter(p => p.subCategoryName === currentPage.subCategoryName)
      : favoriteProductsList
  }

  useEffect(() => {
    if (historyService.getLastUrl() === getUrl()) return
    historyService.setLastUrl(getUrl())

    if (!isFavoritesPage) {
      dispatch(clearProducts())
      dispatch(clearCategoryInfo())

      if (!currentPage.subCategoryName) {
        dispatch(getProductsByCategory(currentPage.categoryName))
        dispatch(getCategoryInfo(currentPage.categoryName))
      } else {
        dispatch(getProductsBySubcategory(currentPage.categoryName, currentPage.subCategoryName))
        dispatch(getCategoryInfo(currentPage.subCategoryName))
      }
    }
  }, [currentPage, currentPage.name, currentPage.titleEn, dispatch, isFavoritesPage])

  let addToCart = null, removeFromCart = null, goCartPage = null
  if (!isUserHasActiveOrder) {
    addToCart = (id) => dispatch(addProductToCart(id))
    removeFromCart = (id, price) => dispatch(removeProductFromCart(id, price))
    goCartPage = () => history.push(`${pages.cart.url}`)
  }

  const toggleFavorites = (id) => dispatch(toggleFavoriteProduct(products.find(p => p.id === id)))

  const setScrollOffset = (scrollOffset) => dispatch(setProductsListScrollOffset(scrollOffset))

  if (products.length === 0) return null

  const productsWithQuantity = combineProductsWithQuantity(products, cartProductsList)
  const productsFull = combineProductsWithFavorites(productsWithQuantity, favoriteProductsList)

  return (
    <div className="products-container">
      <ProductsList
        products={productsFull}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        toggleFavorites={isAuthenticated ? toggleFavorites : null}
        scrollOffset={scrollOffset}
        setScrollOffset={setScrollOffset}
        isInfinityScroll
      />
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

export default CategoryProducts
