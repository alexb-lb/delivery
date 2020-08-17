import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { getCategories } from 'redux/actions/categoriesActions'
import { getFavoriteSubCategories } from 'redux/actions/favoritesActions'
import pages from 'dictionaries/pages'

import CategoriesList from 'components/categoriesList/categoriesList'
import ButtonPriceTotal from 'components/buttonPriceTotal/buttonPriceTotal'

const Categories = () => {
  const history = useHistory()

  const { categoriesList } = useSelector(({ categories }) => categories)
  const { subCategoriesList: favoriteSubCategoriesList } = useSelector(({ favorites }) => favorites)
  const { cartProductsPriceTotal, cartProductsAmount } = useSelector(({ products }) => products)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFavoriteSubCategories())

    if (categoriesList.length === 0) {
      dispatch(getCategories())
    }
  }, [categoriesList.length, dispatch])

  const goCartPage = () => history.push(`${pages.cart.url}`)

  if (categoriesList.length === 0) return null

  return (
    <div className="categories-container">
      {cartProductsAmount > 0
        && <ButtonPriceTotal
          price={cartProductsPriceTotal}
          amount={cartProductsAmount}
          className='btn-price-container'
          handleClick={goCartPage}
        />
      }
      {favoriteSubCategoriesList.length > 0 &&
        <CategoriesList
          className="my-products"
          name={pages.favorites.name}
          nameRu={pages.favorites.titleRu}
          subCategories={favoriteSubCategoriesList}
          rootUrl={pages.user.url}
        />
      }
      {categoriesList.map(category => (
        <CategoriesList key={category.id} {...category} rootUrl={pages.products.url} />
      ))}
    </div>
  )
}

export default Categories
