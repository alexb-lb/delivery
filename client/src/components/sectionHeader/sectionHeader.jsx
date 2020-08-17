import React from 'react'
import PropTypes from 'prop-types'

const CategoryHeader = ({ nameRu }) => (
  <p className="section-header"> {nameRu}</p>
)

CategoryHeader.propTypes = {
  nameRu: PropTypes.string.isRequired,
}

export default CategoryHeader
