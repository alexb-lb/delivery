import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import historyService from 'services/historyService'
import { addProductToCart, removeProductFromCart } from 'redux/actions/productsActions'
import { showModal, setUpModal } from 'redux/actions/overlayActions'
import { startOrderCreation } from 'redux/actions/orderActions'
import { getFullAddress } from 'utils/addressUtil'
import pages from 'dictionaries/pages'
import overlays from 'dictionaries/overlays'
import localStorageService, { DELIVERY_TIME_KEY } from 'services/localStorageService'

import ButtonPriceTotal from 'components/buttonPriceTotal/buttonPriceTotal'
import ProductsList from 'components/productsList/productsList'
import Address from 'components/address/address'
import DropDownItem from 'components/dropDownItem/dropDownItem'

import SvgPencil from 'assets/images/pencil.svg'
import SvgClock from 'assets/images/clock.svg'

const orderValidator = ({ products }) => {
  if (!products.length) {
    return { isValid: false, message: 'Пожалуйста, выберите хотя бы один продукт' }
  }

  return { isValid: true }
}

const getDeliveryTimeOptions = () => {
  const workingHours = ['07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']

  const currentDate = new Date()
  const currentHour = currentDate.getHours()

  return {
    hour: workingHours.filter(h => currentHour >= 23 || currentHour <= 5 ? h : (h > +currentHour + 1)),
    min: ['00', '30']
  }
}

const getInitialDeliveryTime = (deliveryTimeOptions) => {
  const savedDeliveryTime = localStorageService.getItem(DELIVERY_TIME_KEY)

  const initTime = {
    hour: deliveryTimeOptions.hour[0],
    min: deliveryTimeOptions.min[0],
  }

  if (savedDeliveryTime && +savedDeliveryTime.hour >= +deliveryTimeOptions.hour[0]) {
    initTime.hour = savedDeliveryTime.hour
    if (savedDeliveryTime.min) initTime.min = savedDeliveryTime.min
  } else {
    localStorageService.removeItem(DELIVERY_TIME_KEY)
  }

  return initTime
}


const Cart = () => {
  const dispatch = useDispatch()
  const { userDetails, isAuthenticated } = useSelector(({ user }) => user)
  const { cartProductsList, cartProductsPriceTotal, cartProductsAmount } = useSelector(({ products }) => products)
  const { id: isUserHasActiveOrder } = useSelector(({ orders }) => orders.lastActiveOrder)
  const [comment, setComment] = useState('')

  const deliveryTimeOptions = getDeliveryTimeOptions()
  const initDeliveryTime = getInitialDeliveryTime(deliveryTimeOptions)
  const [deliveryTime, setDeliveryTime] = useState({ ...initDeliveryTime })

  const handleCreateOrderClick = () => {
    const order = {
      comment,
      deliveryTime: deliveryTime.hour + ':' + deliveryTime.min,
      products: cartProductsList.filter(p => p.quantity > 0).map(({ id, quantity }) => ({ id, quantity }))
    }

    if (!isAuthenticated) return historyService.goUrlAfterLogin(pages.cart.url)

    const { isValid, message } = orderValidator(order)
    if (!isValid) return alert(message)

    return dispatch(startOrderCreation(order))
  }

  const handleCommentChange = (e) => setComment(e.target.value)

  const addToCart = (id) => dispatch(addProductToCart(id))
  const removeFromCart = (id) => dispatch(removeProductFromCart(id))

  const handleDeliveryTimeSelect = (hour, min) => {
    localStorageService.setItem(DELIVERY_TIME_KEY, { hour, min })
    setDeliveryTime({ hour, min })
  }

  const address = getFullAddress(userDetails)
  const priceTotalMessage = 'замовити'

  if (isUserHasActiveOrder) return (
    <div className="active-order-message">Ви вже маєте активне замовлення. Будь-ласка, дочекайтеся доставки</div>
  )

  const handleShowDropDownModal = () => {
    dispatch(setUpModal({ deliveryTime, deliveryTimeOptions }, handleDeliveryTimeSelect))
    dispatch(showModal(overlays.deliveryTime.name))
  }

  const deliveryText = (deliveryTime.hour <= deliveryTimeOptions.hour[0] && deliveryTime.min === deliveryTimeOptions.min[0])
    ? 'Cкорiше!'
    : `${deliveryTime.hour}:${deliveryTime.min}`

  return (
    <div className="cart-page">
      {cartProductsAmount > 0 &&
        <ButtonPriceTotal
          price={cartProductsPriceTotal}
          amount={cartProductsAmount}
          className={'btn-price-container'}
          handleClick={handleCreateOrderClick}
          message={priceTotalMessage}
        />
      }
      {cartProductsAmount === 0 ?
        <div className="empty-message">
          <p>Корзина пуста</p>
          <Link to={pages.products.url} className="products-link">Вибрати продукти</Link>
        </div>
        :
        <>
          <div className="deliveryTime">
            <div className="title">Коли доставити?</div>
            <DropDownItem
              title={deliveryText}
              onClick={handleShowDropDownModal}
              name={'deliveryTime'}
            >
              <SvgClock className="time-icon" />
            </DropDownItem>
          </div>
          <div className="delivery-container">
            {isAuthenticated && <Address address={address} title="Доставка" />}
            <div className="comment-container">
              <SvgPencil className="pencil-icon" />
              <input className="comment" type="text" onChange={handleCommentChange} value={comment} placeholder="комментар до заказу" />
            </div>
          </div>
          <ProductsList
            products={cartProductsList}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            hideIfZeroQuantity
            isShowRemoveIcon
          />
        </>
      }
    </div >
  )
}

export default Cart

