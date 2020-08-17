import { OVERLAY_SHOW, OVERLAY_HIDE, OVERLAY_SETUP } from 'redux/actionTypes'

export const showModal = (overlay) => {
  return { type: OVERLAY_SHOW, overlay }
}

export const hideModal = () => {
  return { type: OVERLAY_HIDE }
}

export const setUpModal = (content, handler) => {
  return { type: OVERLAY_SETUP, content, handler }
}
