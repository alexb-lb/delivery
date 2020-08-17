import RequestService from 'services/requestService'
import { SET_RESIDENCES } from 'redux/actionTypes'

export const getResidences = (warehouseId) => {
  return async dispatch => {
    const { residences: residencesList = [] } = await RequestService.request({ url: `/warehouses/${warehouseId}/residences` })

    if (residencesList.length > 0) return dispatch({ type: SET_RESIDENCES, residencesList })
  }
}
