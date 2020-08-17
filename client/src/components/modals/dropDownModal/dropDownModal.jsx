import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { hideModal } from 'redux/actions/overlayActions'

const DropDownModal = () => {
  const dispatch = useDispatch()

  const { itemsTotal, title, name } = useSelector(({ overlays }) => overlays.content)
  const onSelect = useSelector(({ overlays }) => overlays.handler)

  const handleCloseModal = () => dispatch(hideModal())

  const list = itemsTotal > 0 && [...new Array(itemsTotal)].map((item, i) => {
    const value = i + 1

    const handleSelectValue = () => {
      onSelect(name, value)
      handleCloseModal()
    }

    return <div key={i} className="item" onClick={handleSelectValue}>{title} {value}</div>
  })

  return (
    <div className="drop-down-modal">
      <div className="list">
        {list}
      </div>
      <button className="btn-close" onClick={handleCloseModal}>Cancel</button>
    </div>
  )
}

export default DropDownModal

