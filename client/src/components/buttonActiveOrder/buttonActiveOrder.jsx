import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import pages from 'dictionaries/pages'
import { getLastActiveOrder } from 'redux/actions/orderActions'

const ButtonActiveOrder = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const { id } = useSelector(({ orders }) => orders.lastActiveOrder)

  useEffect(() => {
    dispatch(getLastActiveOrder())
  }, [dispatch])

  if (!id) return null
  if (location.pathname === pages.orders.url + '/' + id) return null

  return (
    <div className="btn-active-order">
      <Link to={`${pages.orders.url}/${id}`} className="link">
        <span>Статус замовлення</span>
        <div className="background-oval"></div>
      </Link>
    </div>
  )
}

export default ButtonActiveOrder
