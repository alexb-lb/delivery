import React from 'react'
import PropTypes from 'prop-types'

const ProgressBar = ({ stepsTotal, activeStep, values, title = '' }) => {

  const width = (100 / stepsTotal).toFixed(2) + '%'

  const list = [...new Array(stepsTotal)].map((item, i) => {
    const isActive = ((activeStep - 1) >= i) ? 'active' : ''
    const isValue = values && values.length === stepsTotal
    const value = isValue ? values[i] : ''
    const classNames = `${isActive}${isValue ? ' with-value' : ''}`

    return <li key={i} className={classNames} style={{ width }}>{value}</li>
  })

  return (
    <div className="progressbar-container" >
      {title && <div className="title">{title}</div>}
      <ul className="progressbar">
        {list}
      </ul>
    </div >
  )
}

export default ProgressBar

ProgressBar.propTypes = {
  stepsTotal: PropTypes.number.isRequired,
  activeStep: PropTypes.number.isRequired,
  values: PropTypes.array,
  title: PropTypes.string,
}
