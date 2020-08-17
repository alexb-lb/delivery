import React from 'react'

import SvgGoBack from 'assets/images/arrowLeft.svg'


const ButtonBack = ({ onClick }) => (
  <button className="btn-back" onClick={onClick}>
    <SvgGoBack className="go-back-icon" />
    <p>Назад</p>
  </button>
)

export default ButtonBack
