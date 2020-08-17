import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { validateAuth } from 'redux/actions/authActions'
import { setUpModal, showModal } from 'redux/actions/overlayActions'

import overlays from 'dictionaries/overlays'

import AddressHeader from 'components/address/address'
import DropDownItem from 'components/dropDownItem/dropDownItem'
import Input from 'components/input/input'

import SvgSection from 'assets/images/house.svg'
import SvgFloor from 'assets/images/stairs.svg'
import SvgApartment from 'assets/images/key.svg'
import SvgComment from 'assets/images/comment.svg'


const Address = () => {
  const dispatch = useDispatch()

  const { residenceId, address, section, floor, apartment, comment } = useSelector(({ authUser }) => authUser)

  const residencesList = useSelector(({ residences }) => residences.residencesList)
  const residence = residencesList.find(r => r.id === residenceId)

  const [values, setValue] = useState({ section, floor, apartment, comment })

  const handleValueChange = (e) => setValue({ ...values, [e.target.name]: e.target.value })

  const handleSelectFromDropDown = (name, value) => {
    setValue({ ...values, [name]: value })
  }

  const handleShowDropDownModal = (itemsTotal, title, name) => {
    dispatch(setUpModal({ itemsTotal, title, name }, handleSelectFromDropDown))
    dispatch(showModal(overlays.dropDown.name))
  }

  const handleCompleteRegister = () => dispatch(validateAuth(values))

  if (!residence) return null

  return (
    <div className="address-details">
      <AddressHeader id={residenceId} address={address} />

      <DropDownItem title="під'їзд/секція" onClick={handleShowDropDownModal} total={residence.sections} name={'section'} value={values.section}>
        <SvgSection className="section-icon" />
      </DropDownItem>
      <DropDownItem title="поверх" onClick={handleShowDropDownModal} total={residence.floors} name={'floor'} value={values.floor}>
        <SvgFloor className="floor-icon" />
      </DropDownItem>
      <DropDownItem title="квартира" onClick={handleShowDropDownModal} total={residence.apartments} name={'apartment'} value={values.apartment}>
        <SvgApartment className="apartment-icon" />
      </DropDownItem>
      <Input className="comment" name="comment" placeholder="коментар" value={values.comment} onChange={handleValueChange}>
        <SvgComment className="comment-icon" />
      </Input>
      <button className="btn-register" onClick={handleCompleteRegister}>підтвердити</button>
    </div>
  )
}

export default Address

