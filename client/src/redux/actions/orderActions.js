import RequestService from 'services/requestService'
import { SET_ORDERS, CLEAR_CART, SET_ORDER_DETAILS, CLEAR_ORDER_DETAILS, SET_LAST_ACTIVE_ORDER } from 'redux/actionTypes'
import localStorageService, { CART_PRODUCTS_KEY } from 'services/localStorageService'
import { history } from 'app'
import pages from 'dictionaries/pages'

export const startOrderCreation = (data) => {
  return async dispatch => {
    const { orderId } = await RequestService.request({ url: '/user/orders', method: 'POST', data })

    if (orderId) {
      localStorageService.removeItem(CART_PRODUCTS_KEY)
      history.replace(pages.orders.url + '/' + orderId)
      dispatch(getLastActiveOrder())
      return dispatch({ type: CLEAR_CART })
    }
  }
}

export const getOrderDetails = (orderId) => {
  return async dispatch => {
    const { orderDetails } = await RequestService.request({ url: `/user/orders/${orderId}` })

    if (orderDetails && orderDetails.id) return dispatch({ type: SET_ORDER_DETAILS, orderDetails })
  }
}

export const getOrders = () => {
  return async dispatch => {
    const { orders: ordersList } = await RequestService.request({ url: '/user/orders' })

    if (ordersList.length > 0) return dispatch({ type: SET_ORDERS, ordersList })
  }
}

export const getLastActiveOrder = () => {
  return async dispatch => {
    const { orderDetails: lastActiveOrder } = await RequestService.request({ url: '/user/orders/active' })

    if (lastActiveOrder && lastActiveOrder.id) return dispatch({ type: SET_LAST_ACTIVE_ORDER, lastActiveOrder })
  }
}

export const clearOrderDetails = () => {
  return { type: CLEAR_ORDER_DETAILS }
}
