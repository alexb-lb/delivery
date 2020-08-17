import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { goPreviousAuthStep, clearAuth } from 'redux/actions/authActions'

import ButtonBack from 'components/buttonBack/buttonBack'
import ProgressBar from 'components/progressBar/progressBar'
import historyService from 'services/historyService'

const RegisterHeader = () => {
  const dispatch = useDispatch()
  const { stepsTotal, activeStep } = useSelector(({ auth }) => auth)

  const handleClickBack = () => {
    if (activeStep === 1) {
      dispatch(clearAuth())
      return historyService.goSavedUrlOrMainPage()
    }
    dispatch(goPreviousAuthStep())
  }

  return (
    <div className="header">
      <div className="control">
        <ButtonBack onClick={handleClickBack} />
        <div className="progress">
          <ProgressBar stepsTotal={stepsTotal} activeStep={activeStep} />
        </div>
      </div>
    </div>
  )
}

export default RegisterHeader
