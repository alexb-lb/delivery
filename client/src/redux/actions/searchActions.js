import { SET_SEARCH } from 'redux/actionTypes'

export const setLastSearch = (search) => {
  return { type: SET_SEARCH, search }
}
