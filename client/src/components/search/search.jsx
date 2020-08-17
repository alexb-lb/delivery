import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setProductsSearch } from 'redux/actions/productsActions'
import { showModal, hideModal } from 'redux/actions/overlayActions'
import overlays from 'dictionaries/overlays'

import SvgSearch from 'assets/images/search.svg'
import { useLocation } from 'react-router-dom'
import pages from 'dictionaries/pages'

const Search = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const { search } = useSelector(({ products }) => products)

  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    if (search.length > 0) {
      setSearchValue(search)
      dispatch(showModal(overlays.search.name))
    } else {
      setSearchValue('')
      dispatch(hideModal())
    }
  }, [dispatch, search, search.length])

  useEffect(() => {
    if (location.pathname !== pages.search.url) setSearchValue('')
  }, [location])

  const handleInputChange = (e) => setSearchValue(e.target.value)
  const handleKeyDown = (e) => e.key === 'Enter' && dispatch(setProductsSearch(searchValue))

  return (
    <div className="search">
      <input type="text" name="search" value={searchValue} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder="" />
      <SvgSearch className="searchIcon" />
    </div>
  )
}

export default Search
