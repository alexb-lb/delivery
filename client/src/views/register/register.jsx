import React from 'react'
import { useSelector } from 'react-redux'

import RegisterHeader from 'views/register/header/header'
import Credentials from './credentials/credentials'
import Contacts from './contacts/contacts'
import AddressMap from './map/map'
import Finish from './finish/finish'

const Register = () => {
  const { activeStep, isStepsFinished } = useSelector(({ auth }) => auth)

  if (isStepsFinished) return <Finish />

  return (
    <div className="register-container">
      <RegisterHeader />
      {activeStep === 1 && <Credentials />}
      {activeStep === 2 && <Contacts />}
      {activeStep >= 3 && activeStep <= 5 && <AddressMap />}
    </div>
  )
}

export default Register

