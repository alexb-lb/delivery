import { SET_CATEGORIES, SET_CATEGORY_INFO, CLEAR_CATEGORY_INFO } from 'redux/actionTypes'

const initialState = {
  activeCategory: {},
  categoriesList: []
}

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categoriesList: action.categoriesList }
    case SET_CATEGORY_INFO:
      return { ...state, activeCategory: action.category }
    case CLEAR_CATEGORY_INFO:
      return { ...state, activeCategory: initialState.activeCategory }
    default:
      return state
  }
}

export default categoriesReducer
