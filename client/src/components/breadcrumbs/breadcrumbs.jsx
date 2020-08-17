import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { getBreadcrumbs } from 'utils/urlUtil'

import ButtonBack from 'components/buttonBack/buttonBack'
import pages from 'dictionaries/pages'

const Breadcrumbs = () => {
  const history = useHistory()
  const [breadcrumbsPages, setBreadCrumbs] = useState([])

  useEffect(() => {
    setBreadCrumbs(getBreadcrumbs())
  }, [])

  useEffect(() => {
    history.listen(() => setBreadCrumbs(getBreadcrumbs()))
  }, [history])

  const activeCategory = useSelector(({ categories }) => categories.activeCategory)

  const handleClickBack = () => history.goBack()

  if (breadcrumbsPages.length === 0) return null
  if (breadcrumbsPages.length === 1 && breadcrumbsPages[0].name === pages.products.name) return null

  const currentPage = breadcrumbsPages[breadcrumbsPages.length - 1]

  const breadcrumbsList = breadcrumbsPages.map(({ url, titleEn, titleRu }) => {
    let title

    switch (titleEn) {
      case activeCategory.name:
        title = activeCategory.nameRu
        break
      case activeCategory.categoryName:
        title = activeCategory.categoryNameRu
        break
      default: title = titleRu ? titleRu : titleEn
    }

    return (
      <Link key={url} to={url} className={`route ${url === currentPage.url ? 'active' : ''}`}>
        {title}
      </Link>
    )
  })

  return (
    <div className="breadcrumbs-container">
      <ButtonBack onClick={handleClickBack} />
      <div className="routes">
        {breadcrumbsList}
      </div>
    </div>
  )
}

export default Breadcrumbs
