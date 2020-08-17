import { combineReducers } from 'redux'

import overlays from 'redux/reducers/overlayReducer'
import auth from 'redux/reducers/authReducer'
import authUser from 'redux/reducers/authUserReducer'
import user from 'redux/reducers/userReducer'
import products from 'redux/reducers/productsReducer'
import favorites from 'redux/reducers/favoritesReducer'
import search from 'redux/reducers/searchReducer'
import orders from 'redux/reducers/ordersReducer'
import categories from 'redux/reducers/categoriesReducer'
import warehouses from 'redux/reducers/warehousesReducer'
import residences from 'redux/reducers/residencesReducer'

const rootReducer = combineReducers({
  overlays,
  auth,
  authUser,
  user,
  products,
  favorites,
  search,
  orders,
  categories,
  warehouses,
  residences,
})

export default rootReducer
