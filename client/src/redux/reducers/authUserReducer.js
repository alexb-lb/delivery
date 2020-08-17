import { UPDATE_AUTH_USER, CLEAR_AUTH } from 'redux/actionTypes'

const initialState = {
  facebookToken: null,
  email: '',
  password: '',
  phone: '',
  name: '',
  warehouseId: null,
  residenceId: null,
  address: '',
  section: null,
  floor: null,
  apartment: null,
  comment: '',
}

const authUserReducer = (state = initialState, action) => {
  switch (action.type) {

    case UPDATE_AUTH_USER: {
      const nextState = { ...action.payload }
      if (action.payload.password) nextState.password = action.payload.password.password

      return { ...state, ...nextState }
    }

    case CLEAR_AUTH:
      return initialState

    default:
      return state
  }
}

export default authUserReducer
