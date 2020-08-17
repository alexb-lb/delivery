import React from 'react'

import SvgNotFound from 'assets/images/not-found.svg'

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found">
        <div className="title">Нажаль, нічого не знайшлося.</div>
        <SvgNotFound className="notFoundIcon" />
        <div className="title">Спробуй ще раз</div>
      </div>
    </div>
  )
}

export default NotFound
