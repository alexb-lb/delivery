import { SET_FAVORITE_PRODUCTS, TOGGLE_FAVORITE_PRODUCT, SET_FAVORITE_SUBCATEGORIES } from 'redux/actionTypes'

const initialState = {
  productsList: [],
  subCategoriesList: [],
}

const productsFavoritesReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_FAVORITE_PRODUCTS:
      return { ...state, productsList: action.productsList.sort((a, b) => a.id - b.id) }

    case TOGGLE_FAVORITE_PRODUCT: {
      const isProductFavorite = state.productsList.find(sp => sp.id === action.product.id)
      const productsList = isProductFavorite ? state.productsList.filter(p => p.id !== action.product.id) : [...state.productsList, action.product]

      return { ...state, productsList: productsList.sort((a, b) => a.id - b.id) }
    }

    case SET_FAVORITE_SUBCATEGORIES:
      return { ...state, subCategoriesList: action.categoriesList.sort((a, b) => a.id - b.id) }

    default:
      return state
  }
}

export default productsFavoritesReducer
