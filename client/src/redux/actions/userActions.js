import RequestService from 'services/requestService'
import localStorageService, { TOKEN_KEY, CART_PRODUCTS_KEY } from 'services/localStorageService'

import { SET_USER_INFO, LOGOUT } from 'redux/actionTypes'
import historyService from 'services/historyService'
import pages from 'dictionaries/pages'

export const getUser = () => {
  return async dispatch => {
    const token = await localStorageService.getItem(TOKEN_KEY)
    if (!token) return

    const { user } = await RequestService.request({ url: '/user', setOnceToken: token })

    if (user && user.id) {
      return dispatch(login(token, user))
    } else {
      return dispatch(logout())
    }
  }
}

export const login = (token, userDetails) => {
  localStorageService.setItem(TOKEN_KEY, token)
  RequestService.setAuthToken(token)

  const user = { userDetails, isAuthenticated: true }
  return { type: SET_USER_INFO, user }
}

export const logout = () => {
  return async dispatch => {
    await localStorageService.removeItem(CART_PRODUCTS_KEY)
    const token = await localStorageService.removeItem(TOKEN_KEY)

    await RequestService.removeAuthToken(token)

    historyService.goPage(pages.products)
    return dispatch({ type: LOGOUT })
  }
}

export const deleteUser = () => {
  return async dispatch => {
    const isConfirmed = await confirm('Ви дійсно бажаєте видалити цього користувача?')

    if (isConfirmed) {
      const { status } = await RequestService.request({ url: '/user/delete' })
      return dispatch(logout())
    }
  }
}
