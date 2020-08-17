import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logout, deleteUser } from 'redux/actions/userActions'

import HeaderUser from 'components/headerUser/headerUser'
import NavigationItem from 'components/navigationItem/navigationItem'

import SvgClose from 'assets/images/x.svg'
import SvgHome from 'assets/images/house.svg'
import SvgOrders from 'assets/images/basket.svg'
import SvgLogout from 'assets/images/logout.svg'
import SvgHeart from 'assets/images/heart.svg'

import pages from 'dictionaries/pages'
import { hideModal } from 'redux/actions/overlayActions'

const Navigation = () => {
  const dispatch = useDispatch()

  const { isAuthenticated, userDetails } = useSelector(({ user }) => user)

  const handleCloseNavigation = () => {
    dispatch(hideModal())
  }

  const handleLogoutClick = () => {
    dispatch(logout())
    dispatch(hideModal())
  }

  const handleDeleteUser = () => {
    dispatch(deleteUser())
    dispatch(hideModal())
  }

  return (
    <div className="navigation-page">
      <div className="close" onClick={handleCloseNavigation}>
        <SvgClose className="closeIcon" />
      </div>
      <div className="auth-container">
        {isAuthenticated
          ? <HeaderUser user={userDetails} />
          : <NavLink to={pages.login.url} className="auth">{pages.login.titleRu}</NavLink>
        }
      </div>
      <ul className="navigation">
        <NavigationItem name={pages.products.titleRu} link={pages.products.url}>
          <SvgHome className="homeIcon" />
        </NavigationItem>
        <NavigationItem name={pages.orders.titleRu} link={pages.orders.url}>
          <SvgOrders className="ordersIcon" />
        </NavigationItem>
        {isAuthenticated &&
          <>
            <NavigationItem name={pages.favorites.titleRu} link={pages.favorites.url}>
              <SvgHeart className="favoritesIcon" />
            </NavigationItem>
            <li className="logout" onClick={handleLogoutClick}>
              <SvgLogout className="logoutIcon" />
              <p className="title">Вийти</p>
            </li>
          </>
        }
        {isAuthenticated &&
          <li className="logout" onClick={handleDeleteUser}>
            <SvgLogout className="logoutIcon" />
            <p className="title">ВИДАЛИТИ КОРИСТУВАЧА</p>
          </li>
        }
        {/* <NavigationItem name={pages.settings.titleRu} link={pages.settings.url}>
            <SvgSettings className="settingsIcon" />
          </NavigationItem> */}
      </ul>
    </div>
  )
}

export default Navigation
