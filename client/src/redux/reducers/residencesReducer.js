import { LOGOUT, SET_RESIDENCES, CLEAR_RESIDENCES } from 'redux/actionTypes'

const initialState = {
  byWarehouseId: {}, // { [warehouseId]: [...residences array] }
  residencesList: [],
}

const residencesReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_RESIDENCES: {
      const byWarehouseId = { ...state.byWarehouseId }

      action.residencesList.forEach(r => {
        if (!byWarehouseId[r.warehouseId]) {
          byWarehouseId[r.warehouseId] = []
        }

        byWarehouseId[r.warehouseId].push(r)
      })

      return { ...state, byWarehouseId, residencesList: [...state.residencesList, ...new Set(action.residencesList)] }
    }

    case CLEAR_RESIDENCES:
      return initialState

    case LOGOUT:
      return initialState

    default:
      return state
  }
}

export default residencesReducer
