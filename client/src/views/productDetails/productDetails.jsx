import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getLatestPath, getCurrentProductsPage } from 'utils/urlUtil'
import { getProductDetails, setProductDetails, addProductToCart, clearProductDetails } from 'redux/actions/productsActions'
import { getCategoryInfo } from 'redux/actions/categoriesActions'
import ProductDetails from 'components/productDetails/productDetails'
import NotFound from 'components/notFound/notFound'

const PageProductDetails = () => {
  const dispatch = useDispatch()

  const { productDetails, cartProductsList, productsList } = useSelector(({ products }) => products)
  const { activeCategory } = useSelector(({ categories }) => categories)
  const { id: isUserHasActiveOrder } = useSelector(({ orders }) => orders.lastActiveOrder)

  const { subCategoryName: pageSubCategoryName } = getCurrentProductsPage()
  const productId = +getLatestPath()

  const productFromList = productsList.length > 0 && productsList.find(p => p.id === productId)
  const productInCart = cartProductsList.find(p => p.id === productDetails.id)
  const productAmount = productInCart ? productInCart.quantity : 0

  useEffect(() => {
    if (productFromList) {
      dispatch(setProductDetails(productFromList))
    } else {
      dispatch(getProductDetails(productId))
    }

    if (!activeCategory.id || (productFromList && productFromList.subCategoryName !== activeCategory.name)) {
      dispatch(getCategoryInfo(pageSubCategoryName))
    }

    return () => dispatch(clearProductDetails())
  }, [activeCategory, dispatch, pageSubCategoryName, productFromList, productId])

  let addToCart = null
  if (!isUserHasActiveOrder) {
    addToCart = (id) => dispatch(addProductToCart(id))
  }

  if (!productDetails.id) return <NotFound />

  return <ProductDetails {...productDetails} amountInCart={productAmount} addToCart={addToCart} />
}

export default PageProductDetails
