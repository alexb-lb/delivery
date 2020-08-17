import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import pages from 'dictionaries/pages'
import { startRegister, goPreviousAuthStep } from 'redux/actions/authActions'

import ButtonBack from 'components/buttonBack/buttonBack'
import happyUserImg from 'assets/images/happy-user.png'

const Finish = () => {
  const dispatch = useDispatch()

  const authUser = useSelector(({ authUser }) => authUser)

  const handleFinishRegister = () => dispatch(startRegister(authUser))
  const handleGoBack = () => dispatch(goPreviousAuthStep())

  return (
    <div className="registration-finish">
      <div className="header">
        <div className="control">
          <ButtonBack onClick={handleGoBack} />
        </div>
      </div>
      <div className="oval"></div>
      <div className="title">Готово! Вдалих, економних та зручних покупок!</div>
      <img src={happyUserImg} alt="happy-user" />
      <button className="btn-start" onClick={handleFinishRegister}>почати</button>
      <div className="terms-container">
        Продовжуючи, ви приймаєте нашу &nbsp;
        <Link to={pages.terms.url} className="terms">{pages.terms.titleRu}</Link>
      </div>
    </div>
  )
}

export default Finish
