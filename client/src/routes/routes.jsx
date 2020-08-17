import React from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import WithUser from 'hoc/withUser/withUser'
import ModalOverlay from 'views/modalOverlay/modalOverlay'

import Header from 'components/header/header'
import Breadcrumbs from 'components/breadcrumbs/breadcrumbs'
import ButtonActiveOrder from 'components/buttonActiveOrder/buttonActiveOrder'

import PageCategories from 'views/categories/categories'
import PageCategoryProducts from 'views/categoryProducts/categoryProducts'
import PageProductDetails from 'views/productDetails/productDetails'
import PageLogin from 'views/login/login'
import PageRegister from 'views/register/register'
import PageCart from 'views/cart/cart'
import PageOrders from 'views/orders/orders'
import PageOrderDetails from 'views/orderDetails/orderDetails'
import PageSearchResults from 'views/searchResults/searchResults'

import pages from 'dictionaries/pages'

const AppRouter = (props) => (
  <Router history={props.history}>
    <ModalOverlay />
    <Switch>
      <Redirect exact from='/' to={pages.products.url} />
      <Route exact path={[pages.products.url + '*', pages.user.url + '*', pages.search.url + '*', pages.favorites.url + '*']}>
        <WithUser>
          <Header />
          <Breadcrumbs />
          <Route exact path={pages.products.url}>
            <PageCategories />
          </Route>
          <Route exact path={pages.products.url + '/:category'}>
            <PageCategoryProducts />
          </Route>
          <Route exact path={pages.products.url + '/:category/:subCategory'}>
            <PageCategoryProducts />
          </Route>
          <Route exact path={pages.products.url + '/:category/:subCategory/:productId'}>
            <PageProductDetails />
          </Route>
          <Route exact path={pages.favorites.url}>
            <PageCategoryProducts />
          </Route>
          <Route exact path={pages.favorites.url + '/:category'}>
            <PageCategoryProducts />
          </Route>
          <Route exact path={pages.cart.url}>
            <PageCart />
          </Route>
          <Route exact path={pages.orders.url}>
            <PageOrders />
          </Route>
          <Route exact path={pages.orders.url + '/:orderId'}>
            <PageOrderDetails />
          </Route>
          <Route exact path={pages.search.url}>
            <PageSearchResults />
          </Route>
          <ButtonActiveOrder />
        </WithUser>
      </Route>
      <Route exact path={pages.login.url}>
        <PageLogin />
      </Route>
      <Route exact path={pages.register.url}>
        <PageRegister />
      </Route>
      {/* <Route exact path={pages.terms.url}>
        <PageTerms />
      </Route> */}
    </Switch>
  </Router>
)

AppRouter.propTypes = {
  history: PropTypes.object.isRequired,
}


export default AppRouter
