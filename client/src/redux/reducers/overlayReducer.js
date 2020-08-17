import { OVERLAY_SHOW, OVERLAY_HIDE, OVERLAY_SETUP } from 'redux/actionTypes'

const initialState = {
  active: null,
  content: null,
  handler: null,
}

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case OVERLAY_SHOW:
      return { ...state, active: action.overlay }

    case OVERLAY_HIDE:
      return initialState

    case OVERLAY_SETUP:
      return { ...state, content: { ...state.content, ...action.content }, handler: action.handler }

    default:
      return state
  }
}

export default categoriesReducer
