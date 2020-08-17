import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { getUser } from 'redux/actions/userActions'
import { getCartProductsByIds } from 'redux/actions/productsActions'
import { getFavoriteProducts } from 'redux/actions/favoritesActions'

const WithUser = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
    dispatch(getFavoriteProducts())
    dispatch(getCartProductsByIds())
  }, [dispatch])

  return (children)
}

export default WithUser
