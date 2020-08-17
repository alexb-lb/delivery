import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { validateAuth } from 'redux/actions/authActions'

import Input from 'components/input/input'
import SvgMail from 'assets/images/mail.svg'
import SvgLock from 'assets/images/lock.svg'
import imgSafe from 'assets/images/safe.png'

const RegisterCredentials = () => {
  const dispatch = useDispatch()

  const { email, password } = useSelector(({ authUser }) => authUser)
  const errorMessage = useSelector(({ auth }) => auth.errorMessage)
  const [values, setValue] = useState({ email, password, passwordRepeat: password })

  const handleInputChange = (e) => setValue({ ...values, [e.target.name]: e.target.value })

  const handleToNextStepClick = () => {
    const { email, password, passwordRepeat } = values
    dispatch(validateAuth({ email, password: { password, passwordRepeat } }))
  }

  return (
    <div className="section-credentials">
      <div className="title">Оберіть параметри входу</div>
      <div className="form">
        <Input name="email" placeholder="email" value={values.email} onChange={handleInputChange}>
          <SvgMail className="email-icon" />
        </Input>
        <Input name="password" placeholder="пароль" value={values.password} onChange={handleInputChange} type="password">
          <SvgLock className="lock-icon" />
        </Input>
        <Input name="passwordRepeat" placeholder="повтор паролю" value={values.passwordRepeat} onChange={handleInputChange} type="password">
          <SvgLock className="lock-icon" />
        </Input>
        <div className="warning">{errorMessage}</div>
      </div>
      <button className="btn-continue" onClick={handleToNextStepClick}>продовжити</button>
      <div className="footer">
        <img src={imgSafe} alt="safe" />
        <div className="background-oval"></div>
      </div>
    </div>
  )
}

export default RegisterCredentials
