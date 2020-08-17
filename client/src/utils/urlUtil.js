import pages from 'dictionaries/pages'

export const getUrl = () => {
  const { pathname, search } = window.location

  return pathname + search
}

export const getPathArray = () => {
  return window.location.pathname.split('/').filter(path => path.length > 0)
}

export const getLatestPath = () => {
  const pathArr = getPathArray()

  return pathArr[pathArr.length - 1]
}

export const getBreadcrumbs = () => {
  const urlArray = getPathArray()
  let breadcrumbs = []

  if (urlArray[0] === pages.products.name) {
    breadcrumbs = getProductsBreadCrumbs(urlArray)
  }

  if (urlArray[0] === pages.user.name) {
    breadcrumbs = [pages.products, pages[urlArray[1]]]
  }

  if (urlArray[0] === pages.search.name) {
    breadcrumbs = [pages.products, pages.search]
  }

  return breadcrumbs
}

const getProductsBreadCrumbs = (urlArray) => {
  const breadcrumbs = [pages.products]
  let url = pages.products.url

  if (urlArray.length > 1) {
    url += '/' + urlArray[1]
    breadcrumbs.push({ url, titleEn: urlArray[1] })
  }

  if (urlArray.length > 2) {
    url += '/' + urlArray[2]
    breadcrumbs.push({ url, titleEn: urlArray[2] })
  }

  return breadcrumbs
}

export const getCurrentProductsPage = () => {
  const [root, categoryName, subCategoryName, productId] = getPathArray()

  if (productId) {
    return { ...pages.productDetails, categoryName, subCategoryName, productId }
  }

  if (subCategoryName) {
    return { ...pages.subCategory, categoryName, subCategoryName }
  }

  if (categoryName) {
    return { ...pages.category, categoryName }
  }

  return pages.products
}
