export default {
  products: {
    titleEn: '/products',
    titleRu: 'головна',
    url: '/products',
    name: 'products',
  },
  search: {
    titleEn: 'Search',
    titleRu: 'Результати пошуку',
    url: '/search',
    name: 'search',
  },
  category: {
    url: '/products/:category',
    name: 'category',
  },
  subCategory: {
    url: '/products/:category/:subCategory',
    name: 'subCategory',
  },
  productDetails: {
    url: '/products/:category/:subCategory/:productId',
    name: 'productDetails',
  },
  user: {
    titleEn: 'My page',
    titleRu: 'Моя сторінка',
    url: '/user',
    name: 'user',
  },
  favorites: {
    titleEn: 'My products',
    titleRu: 'Мої продукти',
    url: '/user/favorites',
    name: 'favorites',
  },
  orders: {
    titleEn: 'Orders',
    titleRu: 'Замовлення',
    url: '/user/orders',
  },
  orderDetails: {
    titleEn: 'Order status',
    titleRu: 'Статус замовлення',
    url: '/user/orders/:orderId',
  },
  settings: {
    titleRu: 'Налаштування',
    url: '/user/settings',
  },
  cart: {
    titleEn: 'Cart',
    titleRu: 'Корзина',
    url: '/user/cart',
    name: 'cart',
  },
  login: {
    titleEn: 'Login',
    titleRu: 'Увїйти',
    url: '/auth/login',
    name: 'login',
  },
  register: {
    titleEn: 'Register',
    titleRu: 'Зареєструватися',
    url: '/auth/register',
    name: 'register',
  },
  terms: {
    titleEn: 'terms and conditions',
    titleRu: 'політику безпеки та конфіденційності',
    url: '/terms',
    name: 'terms',
  },
}
