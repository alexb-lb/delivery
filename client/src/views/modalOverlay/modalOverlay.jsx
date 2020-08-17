import React from 'react'

import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import overlays from 'dictionaries/overlays'

import { hideModal } from 'redux/actions/overlayActions'

import Navigation from 'components/modals/navigation/navigation'
import DropDownModal from 'components/modals/dropDownModal/dropDownModal'
import DeliveryTimeModal from 'components/modals/deliveryTimeModal/deliveryTimeModal'
import SearchResultsModal from 'components/modals/searchResultsModal/searchResultsModal'

const ModalOverlay = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const activeOverlay = useSelector(({ overlays }) => overlays.active)

  useEffect(() => {
    dispatch(hideModal())
  }, [dispatch, location])

  const isShowNav = activeOverlay === overlays.navigation.name
  const isShowDropDownList = activeOverlay === overlays.dropDown.name
  const isShowDeliveryTime = activeOverlay === overlays.deliveryTime.name
  const isShowSearch = activeOverlay === overlays.search.name

  const isShowHeader = isShowNav || isShowSearch ? 'show-header' : ''

  if (!activeOverlay) return null

  return (
    <div className={`overlay ${isShowHeader}`}>
      {isShowNav && <Navigation />}
      {isShowDropDownList && <DropDownModal />}
      {isShowDeliveryTime && <DeliveryTimeModal />}
      {isShowSearch && <SearchResultsModal />}
    </div>
  )
}

export default ModalOverlay
