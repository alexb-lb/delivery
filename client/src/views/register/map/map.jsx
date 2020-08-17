import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { validateAuth } from 'redux/actions/authActions'
import { getWarehouses } from 'redux/actions/warehousesActions'

import Map from 'components/map/map'
import Residences from '../residences/residences'
import Address from '../address/address'

const WarehousesMap = () => {
  const dispatch = useDispatch()

  const warehousesList = useSelector(({ warehouses }) => warehouses.warehousesList)
  const { activeStep, errorMessage } = useSelector(({ auth }) => auth)

  useEffect(() => {
    if (warehousesList.length === 0) {
      dispatch(getWarehouses())
    }
  }, [dispatch, warehousesList.length])

  const handleWarehouseClick = (warehouseId) => dispatch(validateAuth({ warehouseId }, 4))

  const title = activeStep === 3 ? <span>оберіть найближчий<br />склад-магазин</span> : <span>знайдіть свій дім</span>

  return (
    <div className="section-map">
      <div className="title">{errorMessage || title}</div>
      {warehousesList.length > 0 && <Map places={warehousesList} onMarkerClick={handleWarehouseClick} />}
      {activeStep >= 4 && <Residences />}
      {activeStep >= 5 && <Address />}
    </div>
  )
}

export default WarehousesMap

