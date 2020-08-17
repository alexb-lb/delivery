import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import SectionHeader from 'components/sectionHeader/sectionHeader'
import CategoryItem from 'components/categoryItem/categoryItem'
import SvgGroceries from 'assets/images/groceriesBasket.svg'

const CategoriesList = ({ name, nameRu, subCategories, rootUrl = '', className = '' }) => {
  const history = useHistory()

  const categoryUrl = `${rootUrl}/${name}`

  const goCategoryPage = url => history.push(url)

  return (
    <div className={`categories-row ${className}`}>
      <SectionHeader nameRu={nameRu} className={className} />
      <ul className="categories-list">
        <CategoryItem className={'category-icon'} nameRu={nameRu} goCategoryPage={goCategoryPage} url={categoryUrl}>
          <SvgGroceries className="groceriesIcon" />
        </CategoryItem>
        {subCategories.map(subCategory => (
          <CategoryItem
            key={subCategory.id}
            goCategoryPage={goCategoryPage}
            url={categoryUrl + '/' + subCategory.name}
            {...subCategory}
          />
        ))}
      </ul>
    </div>
  )
}

CategoriesList.propTypes = {
  name: PropTypes.string.isRequired,
  nameRu: PropTypes.string.isRequired,
  rootUrl: PropTypes.string,
  className: PropTypes.string,
  subCategories: PropTypes.arrayOf(PropTypes.shape({
    nameRu: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  })).isRequired,
}

export default CategoriesList
