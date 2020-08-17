import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { validateAuth } from 'redux/actions/authActions'
import { getResidences } from 'redux/actions/residencesActions'

import Address from 'components/address/address'

const Residences = () => {
  const dispatch = useDispatch()

  const { warehouseId } = useSelector(({ authUser }) => authUser)
  const residencesList = useSelector(({ residences }) => residences.byWarehouseId[warehouseId]) || []

  useEffect(() => {
    if (residencesList.length === 0) {
      dispatch(getResidences(warehouseId))
    }
  }, [dispatch, residencesList, warehouseId])

  const handleResidenceClick = (residenceId, address) => dispatch(validateAuth({ residenceId, address }))

  return (
    <div className="address-list">
      {residencesList.length > 0 && residencesList.map(r =>
        <Address key={r.id} id={r.id} address={r.address} onClick={handleResidenceClick} />
      )}
    </div>
  )
}

export default Residences

