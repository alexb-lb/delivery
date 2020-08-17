import { calcCartProductsPriceTotal, calcCartProductsAmount } from 'utils/productsUtil'
import {
  LOGOUT,
  SET_PRODUCT_DETAILS, CLEAR_PRODUCT_DETAILS,
  SET_SEARCH_PRODUCTS,
  SET_PRODUCTS, CLEAR_PRODUCTS, SET_PRODUCTS_SCROLL_OFFSET, SET_PRODUCTS_SEARCH, CLEAR_PRODUCTS_SEARCH,
  SET_CART_PRODUCTS, ADD_CART_PRODUCT, REMOVE_CART_PRODUCT, CHANGE_CART_PRODUCT_QUANTITY, CLEAR_CART
} from 'redux/actionTypes'

const initialState = {
  productDetails: {},
  productsList: [], // [{id, price, quantity, ...}]
  cartProductsList: [], // [{id, quantity}, {...}]
  cartProductsPriceTotal: 0,
  cartProductsAmount: 0,
  scrollOffset: 0,
  search: '',
  searchProductsList: [],  // [{id, price, quantity, ...}]
}

const productsReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_PRODUCTS:
      return { ...state, productsList: action.productsList.sort((a, b) => a.id - b.id) }

    case CLEAR_PRODUCTS: {
      const { productsList, scrollOffset, search } = initialState

      return { ...state, productsList, scrollOffset, search }
    }
    case SET_PRODUCTS_SCROLL_OFFSET:
      return { ...state, scrollOffset: action.scrollOffset }

    case SET_PRODUCTS_SEARCH:
      return { ...state, search: action.search }

    case CLEAR_PRODUCTS_SEARCH: {
      const { search } = initialState

      return { ...state, search }
    }

    case SET_CART_PRODUCTS: {
      const cartProductsList = action.cartProductsList.sort((a, b) => a.id - b.id)
      const cartProductsPriceTotal = calcCartProductsPriceTotal(cartProductsList)
      const cartProductsAmount = calcCartProductsAmount(cartProductsList)

      return { ...state, cartProductsList, cartProductsPriceTotal, cartProductsAmount }
    }

    case REMOVE_CART_PRODUCT: {
      const cartProductsList = state.cartProductsList.filter(p => p.id !== action.product.id)
      const cartProductsPriceTotal = calcCartProductsPriceTotal(cartProductsList)
      const cartProductsAmount = calcCartProductsAmount(cartProductsList)

      return { ...state, cartProductsList, cartProductsPriceTotal, cartProductsAmount }
    }

    case ADD_CART_PRODUCT: {
      const foundProduct = state.productsList.find(p => p.id === action.product.id) || state.productDetails
      const filtered = state.cartProductsList.filter(p => p.id !== action.product.id)

      const cartProductsList = [...filtered, { ...foundProduct, quantity: 1 }].sort((a, b) => a.id - b.id)
      const cartProductsPriceTotal = calcCartProductsPriceTotal(cartProductsList)
      const cartProductsAmount = calcCartProductsAmount(cartProductsList)

      return { ...state, cartProductsList, cartProductsPriceTotal, cartProductsAmount }
    }

    case CHANGE_CART_PRODUCT_QUANTITY: {
      const foundProduct = state.cartProductsList.find(p => p.id === action.product.id)
      const filtered = state.cartProductsList.filter(p => p.id !== action.product.id)

      const cartProductsList = [...filtered, { ...foundProduct, quantity: action.product.quantity }].sort((a, b) => a.id - b.id)
      const cartProductsPriceTotal = calcCartProductsPriceTotal(cartProductsList)
      const cartProductsAmount = calcCartProductsAmount(cartProductsList)

      return { ...state, cartProductsList, cartProductsPriceTotal, cartProductsAmount }
    }

    case CLEAR_CART: {
      const { cartProductsList, cartProductsPriceTotal, cartProductsAmount } = initialState

      return { ...state, cartProductsList, cartProductsPriceTotal, cartProductsAmount }
    }

    case SET_SEARCH_PRODUCTS:
      return { ...state, searchProductsList: action.productsList }

    case SET_PRODUCT_DETAILS:
      return { ...state, productDetails: action.productDetails }

    case CLEAR_PRODUCT_DETAILS: {
      const { productDetails } = initialState

      return { ...state, productDetails }
    }

    case LOGOUT: {
      const { cartProductsList, cartProductsPriceTotal, cartProductsAmount } = initialState

      return { ...state, cartProductsList, cartProductsPriceTotal, cartProductsAmount }
    }

    default:
      return state
  }
}

export default productsReducer
