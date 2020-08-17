import RequestService from 'services/requestService'
import { SET_CATEGORIES, SET_CATEGORY_INFO, CLEAR_CATEGORY_INFO } from 'redux/actionTypes'

export const getCategories = () => {
  return async dispatch => {
    const { categories: categoriesList = [] } = await RequestService.request({ url: '/categories' })

    if (categoriesList.length > 0) return dispatch({ type: SET_CATEGORIES, categoriesList })
  }
}

export const getCategoryInfo = (categoryName) => {
  return async dispatch => {
    const response = await RequestService.request({ url: `/categories/${categoryName}` })
    const category = response.category ? response.category : []

    return dispatch(setCategoryInfo(category))
  }
}

export const setCategoryInfo = (category) => {
  return { type: SET_CATEGORY_INFO, category }
}

export const clearCategoryInfo = () => {
  return { type: CLEAR_CATEGORY_INFO }
}
