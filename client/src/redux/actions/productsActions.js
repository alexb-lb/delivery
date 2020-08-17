import RequestService from 'services/requestService'
import localStorageService, { CART_PRODUCTS_KEY } from 'services/localStorageService'
import { combineProductsWithQuantity } from 'utils/productsUtil'
import historyService from 'services/historyService'
import pages from 'dictionaries/pages'
import {
  SET_PRODUCT_DETAILS, CLEAR_PRODUCT_DETAILS,
  SET_SEARCH_PRODUCTS,
  SET_PRODUCTS, CLEAR_PRODUCTS, SET_PRODUCTS_SCROLL_OFFSET, SET_PRODUCTS_SEARCH, CLEAR_PRODUCTS_SEARCH,
  SET_CART_PRODUCTS, ADD_CART_PRODUCT, REMOVE_CART_PRODUCT, CHANGE_CART_PRODUCT_QUANTITY, CLEAR_CART
} from 'redux/actionTypes'

const insertCartProductsIntoStorage = (products) => {
  localStorageService.setItem(CART_PRODUCTS_KEY, products.sort((a, b) => a.id - b.id))
}

export const getProductsByCategory = (category) => {
  return async dispatch => {
    const { products: productsList = [] } = await RequestService.request({ url: `/products/categories/${category}` })

    if (productsList.length > 0) return dispatch(setProducts(productsList))
  }
}

export const getProductsBySubcategory = (category, subCategory) => {
  return async dispatch => {
    const { products: productsList = [] } = await RequestService.request({ url: `/products/categories/${category}/${subCategory}` })

    if (productsList.length > 0) return dispatch(setProducts(productsList))
  }
}

export const getProductsByIds = (ids) => {
  return async dispatch => {
    const { products: productsList = [] } = await RequestService.request({ url: `/products/?ids=${ids.join(',')}` })

    if (productsList.length > 0) return dispatch(setProducts(productsList))
  }
}

export const setProductsSearch = (search) => {
  return { type: SET_PRODUCTS_SEARCH, search }
}

export const clearProductsSearch = () => {
  return { type: CLEAR_PRODUCTS_SEARCH }
}

export const getProductsBySearch = (search) => {
  return async dispatch => {
    const { products: productsList = [] } = await RequestService.request({ url: `/products/search/${search}` })
    return dispatch({ type: SET_SEARCH_PRODUCTS, productsList })
  }
}

export const setProductsListScrollOffset = (scrollOffset) => {
  return { type: SET_PRODUCTS_SCROLL_OFFSET, scrollOffset }
}

export const getCartProductsByIds = () => {
  return async dispatch => {
    const storageProducts = localStorageService.getItem(CART_PRODUCTS_KEY)
    if (!storageProducts || storageProducts.length === 0) return

    const productsIdsString = storageProducts.map(p => p.id).join(',')
    const { products: productsList = [] } = await RequestService.request({ url: `/products/?ids=${productsIdsString}` })

    const cartProductsList = combineProductsWithQuantity(productsList, storageProducts)

    insertCartProductsIntoStorage(cartProductsList.map(({ id, quantity }) => ({ id, quantity })))

    if (cartProductsList.length > 0) {
      return dispatch({ type: SET_CART_PRODUCTS, cartProductsList })
    }
  }
}

export const setCartProducts = (productsList) => {
  return async dispatch => {
    const currentStorageProducts = localStorageService.getItem(CART_PRODUCTS_KEY) || []
    const newStorageProducts = productsList.map(({ id, quantity }) => ({ id, quantity }))
    insertCartProductsIntoStorage([...currentStorageProducts, ...newStorageProducts])

    historyService.goPage(pages.cart)
    dispatch(getCartProductsByIds())
  }
}

export const getProductDetails = (productId) => {
  return async dispatch => {
    const { productDetails = {} } = await RequestService.request({ url: `/products/${productId}` })

    if (productDetails && productDetails.id) return dispatch(setProductDetails(productDetails))
  }
}

export const setProductDetails = (productDetails) => {
  return { type: SET_PRODUCT_DETAILS, productDetails }
}

export const clearProductDetails = () => {
  return { type: CLEAR_PRODUCT_DETAILS }
}

export const setProducts = (productsList) => {
  return { type: SET_PRODUCTS, productsList }
}

export const clearProducts = () => {
  return { type: CLEAR_PRODUCTS }
}

export const addProductToCart = (id) => {
  const currentStorageProducts = localStorageService.getItem(CART_PRODUCTS_KEY)

  let nextProduct = { id, quantity: 1 }
  let nextStorageProducts = [nextProduct]

  if (currentStorageProducts) {
    const prevProduct = currentStorageProducts.find(p => p.id === id)
    if (prevProduct) {
      nextProduct = { ...prevProduct, quantity: prevProduct.quantity + 1 }
    }

    nextStorageProducts = currentStorageProducts.filter(p => p.id !== id)
    nextStorageProducts.push(nextProduct)
  }

  insertCartProductsIntoStorage(nextStorageProducts)

  return { type: nextProduct.quantity === 1 ? ADD_CART_PRODUCT : CHANGE_CART_PRODUCT_QUANTITY, product: nextProduct }
}

export const removeProductFromCart = (id) => {
  const currentStorageProducts = localStorageService.getItem(CART_PRODUCTS_KEY)
  const foundProduct = currentStorageProducts && currentStorageProducts.find(p => p.id === id)
  if (!foundProduct) return

  const nextCartProducts = [...currentStorageProducts.filter(p => p.id !== id)]
  const nextProduct = { ...foundProduct, quantity: foundProduct.quantity - 1 }

  if (nextProduct.quantity > 0) {
    nextCartProducts.push(nextProduct)
  }
  nextCartProducts.length > 0 ? insertCartProductsIntoStorage(nextCartProducts) : localStorageService.removeItem(CART_PRODUCTS_KEY)

  return { type: nextProduct.quantity === 0 ? REMOVE_CART_PRODUCT : CHANGE_CART_PRODUCT_QUANTITY, product: nextProduct }
}

export const clearCart = () => {
  return { type: CLEAR_CART }
}
