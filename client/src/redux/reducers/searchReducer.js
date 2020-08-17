import { SET_SEARCH, CLEAR_SEARCH } from 'redux/actionTypes'

const initialState = {
  lastSearch: '',
}

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_SEARCH:
      return { ...state, lastSearch: action.search }

    case CLEAR_SEARCH:
      return initialState

    default:
      return state
  }
}

export default categoriesReducer
