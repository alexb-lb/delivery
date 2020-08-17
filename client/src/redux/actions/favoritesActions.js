import RequestService from 'services/requestService'
import { SET_FAVORITE_PRODUCTS, TOGGLE_FAVORITE_PRODUCT, SET_FAVORITE_SUBCATEGORIES } from 'redux/actionTypes'

export const getFavoriteProducts = () => {
  return async dispatch => {
    const { products: productsList = [] } = await RequestService.request({ url: '/user/favorites/products' })

    if (productsList.length > 0) return dispatch({ type: SET_FAVORITE_PRODUCTS, productsList })
  }
}

export const toggleFavoriteProduct = (product) => {
  if (product) {
    RequestService.request({ url: '/user/favorites/products', method: 'POST', data: { product } })

    return { type: TOGGLE_FAVORITE_PRODUCT, product }
  }
}

export const getFavoriteSubCategories = () => {
  return async dispatch => {
    const { categories: categoriesList = [] } = await RequestService.request({ url: '/user/favorites/subcategories' })

    if (categoriesList.length > 0) return dispatch({ type: SET_FAVORITE_SUBCATEGORIES, categoriesList })
  }
}
