import { SET_WAREHOUSES, SET_ACTIVE_WAREHOUSE } from 'redux/actionTypes'

const initialState = {
  warehousesList: [],
}

const warehousesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WAREHOUSES:
      return { ...state, warehousesList: action.warehousesList }

    case SET_ACTIVE_WAREHOUSE:
      return { ...state, activeWarehouse: action.warehouseId }

    default:
      return state
  }
}

export default warehousesReducer
