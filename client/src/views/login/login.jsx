import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { startLogin, startFacebookAuth } from 'redux/actions/authActions'

import FacebookLogin from 'react-facebook-login'

import SvgFacebook from 'assets/images/facebook.svg'
import Input from 'components/input/input'
import SvgMail from 'assets/images/mail.svg'
import SvgLock from 'assets/images/lock.svg'
import logoImg from 'assets/images/newLogo.png'

import pages from 'dictionaries/pages'

const loginFormChecker = (values) => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (!emailRegex.test(values.email.trim().toLowerCase())) {
    return { isValid: false, message: 'Умейл указаний невiрно' }
  }

  if (values.password.trim().length < 5) {
    return { isValid: false, message: 'Пароль не може бути менш нiж 5 символiв' }
  }

  return { isValid: true }
}

const Login = () => {
  const dispatch = useDispatch()
  const [values, setValue] = useState({ email: '', password: '' })

  const handleInputChange = (e) => setValue({ ...values, [e.target.name]: e.target.value })

  const handleLoginClick = () => {
    const { isValid, message } = loginFormChecker(values)
    if (!isValid) return alert(message)

    return dispatch(startLogin(values.email, values.password))
  }

  const responseFacebook = (data) => dispatch(startFacebookAuth(data))

  return (
    <div className="page page-login">
      <div className="logo">
        <img src={logoImg} alt="logo" />
      </div>
      <div className="oval"></div>

      <div className="section">
        <div className="form">
          <Input name="email" placeholder="email" value={values.email} onChange={handleInputChange}>
            <SvgMail className="email-icon" />
          </Input>
          <Input name="password" placeholder="пароль" value={values.password} onChange={handleInputChange} type="password">
            <SvgLock className="lock-icon" />
          </Input>
        </div>

        <div className="auth-methods">
          <button className="btn local" onClick={handleLoginClick}>
            {pages.login.titleRu}
          </button>
          <p>або</p>
          <FacebookLogin
            appId={process.env.FACEBOOK_APP_ID}
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass="btn facebook"
            icon={<SvgFacebook className="fb-icon" />}
            autoLoad={false}
            isMobile={false}
            textButton="Facebook"
          />
        </div>

        <div className="register-box">
          <p>Вперше тут?&nbsp;
            <Link to={pages.register.url} className="register">{pages.register.titleRu}</Link>
          </p>
        </div>

        <div className="terms-container">
          Продовжуючи, ви приймаєте нашу нашу &nbsp;
          <Link to={pages.terms.url} className="terms">{pages.terms.titleRu}</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
