import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { getOrders } from 'redux/actions/orderActions'
import pages from 'dictionaries/pages'
import orderStatus from 'dictionaries/orderStatuses'

import NotFound from 'components/notFound/notFound'
import CartAmount from 'components/cartAmount/cartAmount'

const Orders = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { ordersList } = useSelector(({ orders }) => orders)

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])

  const goOrderDetailsPage = (orderId) => history.push(`${pages.orders.url}/${orderId}`)

  if (ordersList.length === 0) return <NotFound />

  return (
    <div className="page-orders">
      <div className="orders-container">
        {ordersList.map(({ id, status, priceTotal, quantityTotal }) => {

          const handleGoProductPage = () => goOrderDetailsPage(id)

          const { isCompleted } = orderStatus[status]

          return (
            <div className="order-item" key={id} onClick={handleGoProductPage}>
              <CartAmount amount={quantityTotal} className="amount-container" />
              <div className="title">
                {isCompleted ? 'виконане' : 'активне'}
              </div>
              <div className="price">
                {priceTotal}&nbsp;грн
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Orders
