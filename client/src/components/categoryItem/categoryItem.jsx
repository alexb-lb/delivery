import React from 'react'
import PropTypes from 'prop-types'

const CategoryItem = props => {
  const { nameRu, url, goCategoryPage, image = '', className = null, children = null, } = props

  const handleClick = () => goCategoryPage(url)

  return (
    <li className="category-item" onClick={handleClick}>
      {children
        ? <div className={`photo ${className}`}>{children}</div>
        : <div className="photo" style={{ backgroundImage: `url(${image})` }}></div>}
      <p className="name">{nameRu}</p>
    </li>
  )
}

CategoryItem.propTypes = {
  nameRu: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  goCategoryPage: PropTypes.func.isRequired,
  image: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.object,
}

export default CategoryItem
