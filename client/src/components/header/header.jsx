import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import overlays from 'dictionaries/overlays'
import { showModal } from 'redux/actions/overlayActions'
import pages from 'dictionaries/pages'

import Search from 'components/search/search'
import CartAmount from 'components/cartAmount/cartAmount'
// import SvgHeart from 'assets/images/heart.svg'

const Header = () => {
  const dispatch = useDispatch()

  const { cartProductsAmount } = useSelector(({ products }) => products)
  const { id: isUserHasActiveOrder } = useSelector(({ orders }) => orders.lastActiveOrder)

  const handleShowNavigation = () => {
    dispatch(showModal(overlays.navigation.name))
  }

  return (
    <header className="main-header">
      <div className="navigation-toggle" onClick={handleShowNavigation}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <Search />
      {/* <div className="favorites">
        <SvgHeart className="heartIcon" />
      </div> */}
      {!isUserHasActiveOrder &&
        <Link to={pages.cart.url} className="cart-box">
          <CartAmount amount={cartProductsAmount} />
        </Link>
      }
    </header>
  )
}

export default Header
