import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { hideModal } from 'redux/actions/overlayActions'

import Picker from 'react-mobile-picker'

const DeliveryTimeModal = () => {
  const dispatch = useDispatch()

  const onSelect = useSelector(({ overlays }) => overlays.handler)
  const { deliveryTime, deliveryTimeOptions } = useSelector(({ overlays }) => overlays.content)

  const [valueGroups, setValueGroups] = useState(deliveryTime)

  const handleChange = (name, value) => {
    setValueGroups({ ...valueGroups, [name]: value })
  }

  const handleSelectValue = () => {
    onSelect(valueGroups.hour, valueGroups.min)
    dispatch(hideModal())
  }

  return (
    <div className="time-picker" onClick={handleSelectValue}>
      <Picker
        optionGroups={deliveryTimeOptions}
        valueGroups={valueGroups}
        onChange={handleChange}
      />
      <button className="btn-cancel">ОК</button>
    </div>
  )
}

export default DeliveryTimeModal

