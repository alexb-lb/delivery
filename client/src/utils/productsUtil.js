import { toFixed } from 'utils/numberUtil'

export const combineProductsWithQuantity = (products, storageProducts) => {
  const productsListWithQuantity = products.map(p => {
    const storageProduct = storageProducts && storageProducts.find(sp => sp.id === p.id)

    return { ...p, quantity: storageProduct && storageProduct.quantity || 0 }
  })

  return productsListWithQuantity
}

export const combineProductsWithFavorites = (products, favoriteProducts) => {
  const productsListWithFavorites = products.map(p => {
    const favoriteProduct = favoriteProducts && favoriteProducts.find(fp => fp.id === p.id)

    return { ...p, isFavorite: !!favoriteProduct }
  })

  return productsListWithFavorites
}

export const calcCartProductsPriceTotal = (products) => {
  if (!products || products.length === 0) return 0

  return toFixed(products.reduce((acc, { price, quantity }) => (acc + price * quantity), 0))
}

export const calcCartProductsAmount = (products) => {
  if (!products || products.length === 0) return 0

  return toFixed(products.reduce((acc, { quantity }) => (acc + quantity), 0))
}
