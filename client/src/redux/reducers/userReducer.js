import { SET_USER_INFO, LOGOUT } from 'redux/actionTypes'

const initialState = {
  isAuthenticated: false,
  userDetails: {}
}

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return { ...state, ...action.user }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}

export default categoriesReducer
