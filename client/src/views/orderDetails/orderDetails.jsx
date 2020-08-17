import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getLatestPath } from 'utils/urlUtil'
import { getOrderDetails, clearOrderDetails } from 'redux/actions/orderActions'
import { setCartProducts } from 'redux/actions/productsActions'
import orderStatus from 'dictionaries/orderStatuses'

import NotFound from 'components/notFound/notFound'
import ProductsList from 'components/productsList/productsList'
import Address from 'components/address/address'
import ProgressBar from 'components/progressBar/progressBar'

import SvgPhone from 'assets/images/phone.svg'
import SvgHryvna from 'assets/images/hryvna.svg'
import SvgClock from 'assets/images/clock.svg'

const PageOrderDetails = () => {
  const dispatch = useDispatch()
  const orderId = +getLatestPath()

  const { orderDetails, lastActiveOrder } = useSelector(({ orders }) => orders)

  const order = lastActiveOrder.id === orderId ? lastActiveOrder : orderDetails.id === orderId ? orderDetails : {}
  const { id, address, status, priceTotal, carrierName, carrierPhone, carrierType, productsList, deliveryTime } = order

  const [isShowCarrierPhone, toggleCarrierInfo] = useState(false)

  useEffect(() => {
    if (lastActiveOrder.id !== orderId) {
      dispatch(getOrderDetails(orderId))
    }

    return () => dispatch(clearOrderDetails())
  }, [dispatch, lastActiveOrder.id, orderId])

  const handleToggleCarrierInfo = () => toggleCarrierInfo(!isShowCarrierPhone)
  const handleCopyOrderToCart = () => dispatch(setCartProducts(productsList))

  if (!id) return <NotFound />

  const sortedStatuses = Object.values(orderStatus).sort((a, b) => a.orderId - b.orderId)
  const activeStatus = sortedStatuses.find(s => s.name === status)
  const statuses = sortedStatuses.map(s => s.short)

  return (
    <div className="page-order-details">
      <div className="status">
        <ProgressBar stepsTotal={sortedStatuses.length} activeStep={activeStatus.order} values={statuses} title={activeStatus.full} />
      </div>
      {activeStatus.isShowCarrier &&
        <div className="shipment-container" onClick={handleToggleCarrierInfo}>
          <SvgPhone className="phone-icon" />
          {isShowCarrierPhone ? <p>{carrierPhone}</p> : <p>{carrierName} ({carrierType})</p>}
        </div>
      }
      {activeStatus.isCompleted &&
        <div className="shipment-container" onClick={handleCopyOrderToCart}>
          <p>Повторити замовлення</p>
        </div>
      }
      <div className="deliveryTime">
        <div className="title">Коли доставити?</div>
        <div className="setTime">
          <SvgClock className="svgClock" />
          <div className="valueTime">{deliveryTime}</div>
        </div>
      </div>
      <div className="price-container">
        <div className="title">Сума</div>
        <div className="price">
          <SvgHryvna className="price-icon" />
          <p>{priceTotal}грн</p>
        </div>
      </div>
      <Address address={address} title="Доставка" />
      <ProductsList products={productsList} />
    </div>
  )
}

export default PageOrderDetails
