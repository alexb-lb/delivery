import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { validateAuth } from 'redux/actions/authActions'

import Input from 'components/input/input'
import SvgPerson from 'assets/images/person.svg'
import SvgPhone from 'assets/images/phone.svg'
import imgBiker from 'assets/images/motorbike.png'

const Contacts = () => {
  const dispatch = useDispatch()

  const { name, phone } = useSelector(({ authUser }) => authUser)
  const errorMessage = useSelector(({ auth }) => auth.errorMessage)
  const [values, setValue] = useState({ name, phone })

  const handleToNextStepClick = () => dispatch(validateAuth({ ...values }))
  const handleInputChange = (e) => setValue({ ...values, [e.target.name]: e.target.value })

  return (
    <div className="section-contacts">
      <div className="title">Вкажіть контактний номер телефону для зв’язку з кур’єром</div>
      <div className="form">
        <Input name="name" placeholder="ім'я" value={values.name} onChange={handleInputChange}>
          <SvgPerson className="person-icon" />
        </Input>
        <Input name="phone" value={values.phone} onChange={handleInputChange} type="number" isPhoneMask>
          <>
            <SvgPhone className="phone-icon" />
            <p className="phone-prefix">+38</p>
          </>
        </Input>
        <div className="warning">{errorMessage}</div>
      </div>
      <button className="btn-continue" onClick={handleToNextStepClick}>продовжити</button>
      <div className="footer">
        <img src={imgBiker} alt="motorbike" />
        <div className="background-oval"></div>
      </div>
    </div>
  )
}

export default Contacts
