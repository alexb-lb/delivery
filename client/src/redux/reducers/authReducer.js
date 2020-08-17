import {
  SET_AUTH_ERROR, CLEAR_AUTH_ERROR, CLEAR_AUTH,
  SET_ACTIVE_AUTH_STEP, INCREMENT_ACTIVE_AUTH_STEP, DECREMENT_ACTIVE_AUTH_STEP
} from 'redux/actionTypes'

const initialState = {
  errorMessage: '',
  errorInElement: '',
  stepsTotal: 5,
  activeStep: 1,
  isStepsFinished: false,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_ERROR:
      return { ...state, ...action.payload }

    case SET_ACTIVE_AUTH_STEP:
      return { ...state, activeStep: action.activeStep }

    case INCREMENT_ACTIVE_AUTH_STEP: {
      if (state.activeStep === state.stepsTotal) {
        return { ...state, isStepsFinished: true }
      }

      return { ...state, activeStep: state.activeStep + 1 }
    }

    case DECREMENT_ACTIVE_AUTH_STEP: {
      if (state.isStepsFinished && state.activeStep === state.stepsTotal) {
        return { ...state, isStepsFinished: false }
      }

      return { ...state, activeStep: state.activeStep - 1 }
    }

    case CLEAR_AUTH_ERROR:
      return { ...state, errorMessage: initialState.errorMessage, errorInElement: initialState.errorInElement }

    case CLEAR_AUTH:
      return initialState

    default:
      return state
  }
}

export default authReducer
