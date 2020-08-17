export default {
  taken: {
    name: 'taken',
    order: 1,
    full: 'Замовлення обробляється нашими працівниками',
    short: 'прийнято',
    isCompleted: false,
    isShowCarrier: false,
  },
  processing: {
    name: 'processing',
    order: 2,
    full: 'Замовлення комплектують у магазині',
    short: 'збираємо',
    isCompleted: false,
    isShowCarrier: false,
  },
  shipped: {
    name: 'shipped',
    order: 3,
    full: 'Замовлення передано до служби доставки',
    short: 'в дорозі',
    isCompleted: false,
    isShowCarrier: true,
  },
  completed: {
    name: 'completed',
    order: 4,
    full: 'Заказ отримано',
    short: 'викониний',
    isCompleted: true,
    isShowCarrier: false,
  },
}
