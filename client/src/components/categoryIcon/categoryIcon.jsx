import React from 'react'
import PropTypes from 'prop-types'

const CategoryItem = props => {
  const { id, nameRu, goCategoryPage, image, className = null, children = null, url } = props

  const handleClick = () => goCategoryPage(url)

  return (
    <li key={id} className="category-item" onClick={handleClick}>
      {children
        ? <div className={`photo ${className}`}>{children}</div>
        : <div className="photo" style={{ backgroundImage: `url(${image})` }}></div>}
      <p className="name">{nameRu}</p>
    </li>
  )
}

CategoryItem.propTypes = {
  url: PropTypes.string.isRequired,
  nameRu: PropTypes.string.isRequired,
  goCategoryPage: PropTypes.func.isRequired,
  id: PropTypes.number,
  image: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.object,
}

export default CategoryItem
