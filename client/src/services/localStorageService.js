export const TOKEN_KEY = 'authToken'
export const CART_PRODUCTS_KEY = 'cartProducts'
export const DELIVERY_TIME_KEY = 'deliveryTime'

class LocalStorageService {
  constructor() {
    this.storage = window.localStorage
    this.listeners = new Map()

    window.addEventListener('storage', this.onStorageChanged)
  }

  setItem(key, item) {
    this.storage.setItem(key, JSON.stringify(item))
  }

  getItem(key) {
    const item = this.storage.getItem(key)
    if (!item) return null

    return JSON.parse(item) || null
  }

  removeItem(key) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }

  addListener = (key, listener) => {
    return this.listeners.set(key, listener)
  }

  removeListener = (key) => {
    return this.listeners.delete(key)
  }

  removeAllListener = () => {
    this.listeners.clear()
  }

  onStorageChanged = (event) => {
    this.listeners.forEach((listener, key) => {
      const isSameKey = key === event.key
      const isDiffData = event.oldValue !== event.newValue

      if (isSameKey && isDiffData) {
        listener(JSON.parse(event.newValue))
      }
    })
  }
}

export default new LocalStorageService()
