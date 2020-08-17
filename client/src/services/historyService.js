import { history } from 'app'
import pages from 'dictionaries/pages'

const serialize = (obj) => {
  return new URLSearchParams(obj).toString()
}

const deserialize = (search) => {
  const urlParams = new URLSearchParams(search)
  return Object.fromEntries(urlParams)
}

class HistoryService {
  returnUrl = null
  lastUrl = ''

  goPage(page) {
    history.push(page.url)
  }

  goUrlAfterLogin(url) {
    this.returnUrl = url
    history.push(pages.login.url)
  }

  goSavedUrlOrMainPage() {
    if (!this.returnUrl) return history.push(pages.products.url)

    history.push(this.returnUrl)
    this.returnUrl = null
  }

  getLastUrl() {
    return this.lastCategoryProductsUrl
  }

  setLastUrl(url) {
    this.lastCategoryProductsUrl = url
  }

  goSearchPageWithQuery(params) {
    history.push(`${pages.search.url}?${serialize(params)}`)
  }

  getSearchParams() {
    return deserialize(history.location.search)
  }
}

export default new HistoryService()
