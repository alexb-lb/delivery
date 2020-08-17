import { LOGOUT, SET_ORDERS, SET_ORDER_DETAILS, CLEAR_ORDER_DETAILS, SET_LAST_ACTIVE_ORDER, } from 'redux/actionTypes'
import { getFullAddress } from 'utils/addressUtil'
import { calcCartProductsPriceTotal } from 'utils/productsUtil'

const initialState = {
  ordersList: [],
  orderDetails: {
    id: null,
    address: '',
    status: '',
    createdAt: '',
    deliveryTime: '',
    priceTotal: 0,
    productsList: [], // [{id, price, quantity, ...}]
  },
  lastActiveOrder: {
    id: null,
    address: '',
    status: '',
    createdAt: '',
    deliveryTime: '',
    priceTotal: 0,
    productsList: [], // [{id, price, quantity, ...}]
  },
}

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_ORDERS:
      return { ...state, ordersList: action.ordersList }

    case SET_ORDER_DETAILS: {
      const orderDetails = {
        ...action.orderDetails,
        priceTotal: calcCartProductsPriceTotal(action.orderDetails.productsList),
        address: getFullAddress(action.orderDetails),
        productsList: action.orderDetails.productsList
      }

      return { ...state, orderDetails }
    }

    case SET_LAST_ACTIVE_ORDER: {
      const lastActiveOrder = {
        ...action.lastActiveOrder,
        priceTotal: calcCartProductsPriceTotal(action.lastActiveOrder.productsList),
        address: getFullAddress(action.lastActiveOrder),
        productsList: action.lastActiveOrder.productsList
      }

      return { ...state, lastActiveOrder }
    }

    case CLEAR_ORDER_DETAILS:
      return { ...state, orderDetails: initialState.orderDetails }

    case LOGOUT:
      return initialState

    default:
      return state
  }
}

export default ordersReducer
