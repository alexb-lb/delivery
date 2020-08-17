import RequestService from 'services/requestService'
import { SET_WAREHOUSES, SET_ACTIVE_WAREHOUSE } from 'redux/actionTypes'

export const getWarehouses = () => {
  return async dispatch => {
    const { warehouses: warehousesList = [] } = await RequestService.request({ url: '/warehouses' })

    if (warehousesList.length > 0) return dispatch({ type: SET_WAREHOUSES, warehousesList })
  }
}

export const setActiveWarehouse = (warehouseId) => {
  return { type: SET_ACTIVE_WAREHOUSE, warehouseId }
}
