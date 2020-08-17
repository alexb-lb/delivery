import RequestService from 'services/requestService'
import { login } from 'redux/actions/userActions'

import {
  SET_AUTH_ERROR, CLEAR_AUTH_ERROR, SET_ACTIVE_AUTH_STEP, INCREMENT_ACTIVE_AUTH_STEP, DECREMENT_ACTIVE_AUTH_STEP, CLEAR_AUTH,
  UPDATE_AUTH_USER,
} from 'redux/actionTypes'

import RegisterService from 'services/registerService'
import historyService from 'services/historyService'
import pages from 'dictionaries/pages'
import { FAILED_TO_FETCH, NOT_FOUND } from 'dictionaries/serverStatuses'

export const startLogin = (email, password) => {
  return async dispatch => {
    const { status, token, user } = await RequestService.request({ url: '/auth/login', method: 'POST', data: { email, password } })

    if (status === NOT_FOUND) return alert('Користувача не знайдено. Зареєструйтесь, будь-ласка')

    if (token && user) {
      historyService.goSavedUrlOrMainPage()
      return dispatch(login(token, user))
    }
  }
}

export const startRegister = (data) => {
  return async dispatch => {
    const { facebookToken, email, password, phone, name, residenceId, address, section, floor, apartment, comment } = data

    const isFacebookAuth = facebookToken && email.trim().length === 0

    const dataForValidate = { phone, name, residenceId, address, section, floor, apartment, comment }
    if (isFacebookAuth) {
      dataForValidate.facebookToken = facebookToken
    } else {
      dataForValidate.email = email
      dataForValidate.password = { password, passwordRepeat: password }
    }

    const { isValid, message, element } = await RegisterService.validate(dataForValidate)

    if (!isValid) {
      return dispatch({ type: SET_AUTH_ERROR, payload: { errorMessage: message, errorInElement: element } })
    }

    const params = {
      url: '/auth/register',
      method: 'POST',
      data: {
        email,
        password,
        phone: '38' + phone.replace(/\(|\)/g, ''),
        name,
        residenceId,
        address,
        section,
        floor,
        apartment,
        comment,
        isFacebookAuth
      }
    }

    if (isFacebookAuth) {
      params.setOnceToken = facebookToken
    }

    const { token, user } = await RequestService.request(params)

    if (token && user) {
      dispatch({ type: CLEAR_AUTH })
      historyService.goSavedUrlOrMainPage()
      return dispatch(login(token, user))
    } else {
      return null
    }
  }
}

export const startFacebookAuth = ({ accessToken }) => {
  return async dispatch => {
    const { status, token, user } = await RequestService.request({ url: '/auth/facebook', setOnceToken: accessToken })

    if (status === FAILED_TO_FETCH) return

    if (user) {
      historyService.goSavedUrlOrMainPage()
      return dispatch(login(token, user))
    } else {
      historyService.goPage(pages.register)
      return dispatch(validateAuth({ facebookToken: accessToken }))
    }
  }
}

export const validateAuth = (authValues, step = null) => {
  return async dispatch => {

    const { isValid, message, element } = await RegisterService.validate(authValues)

    if (!isValid) {
      return dispatch({ type: SET_AUTH_ERROR, payload: { errorMessage: message, errorInElement: element } })
    }

    dispatch({ type: UPDATE_AUTH_USER, payload: authValues })
    dispatch({ type: CLEAR_AUTH_ERROR })
    return dispatch(step ? goAuthStep(step) : goNextAuthStep(authValues.nextStep))
  }
}

export const goAuthStep = (activeStep) => {
  return { type: SET_ACTIVE_AUTH_STEP, activeStep }
}
export const goNextAuthStep = () => {
  return { type: INCREMENT_ACTIVE_AUTH_STEP }
}
export const goPreviousAuthStep = () => {
  return { type: DECREMENT_ACTIVE_AUTH_STEP }
}

export const clearAuth = () => {
  return { type: CLEAR_AUTH }
}
