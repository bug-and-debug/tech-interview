require('../setup')
const ItemModel = require('../models/item.model');
const MealModel = require('../models/meal.model');
const OrderModel = require('../models/order.model');
const config = require('./../config');

const MEALS = [
  {
    name: 'Jamaican Jerk Chicken and Freekeh',
    code: 'MEAL-1',
    byline: 'some value'
  },
  {
    name: 'Grilled Farm Fresh Chicken',
    code: 'MEAL-2',
    byline: 'some value'
  },
  {
    name: 'Pan‑seared Norwegian Salmon',
    code: 'MEAL-3',
    byline: 'some value'
  },
  {
    name: 'Roasted Thai Chicken with Sautéed Greens',
    code: 'MEAL-4',
    byline: 'some value'
  },
  {
    name: 'Mediterranean Chickpea Salad',
    code: 'MEAL-5',
    byline: 'some value'
  },
  {
    name: 'Prawn Gyoza',
    code: 'MEAL-6',
    byline: 'some value'
  },
  {
    name: 'Raspberry Frangipane',
    code: 'MEAL-7',
    byline: 'some value'
  },
  {
    name: 'Chocolate Banana Crumble Tart',
    code: 'MEAL-8',
    byline: 'some value'
  },
  {
    name: 'The Himalayas Cold‑Pressed Juice',
    code: 'MEAL-9',
    byline: 'some value'
  },
  {
    name: 'Pink Coconut Water',
    code: 'MEAL-10',
    byline: 'some value'
  }
]

const ITEMS = [
  [0, 2, 20],
  [1, 1, 32],
  [2, 4, 12],
  [3, 8, 18],
  [4, 6, 52],
  [5, 3, 28],
  [6, 2, 90],
  [7, 7, 15],
  [8, 1, 31],
  [9, 4, 21],
  [4, 7, 50],
  [1, 4, 33],
  [2, 2, 12],
  [7, 5, 16],
  [3, 2, 19]
]

const ORDERS = [
  {
    date: new Date('03 01 2018'),
    items: [0, 1, 2]
  },
  {
    date: new Date('03 02 2018'),
    items: [0, 3, 4, 5, 6]
  },
  {
    date: new Date('03 03 2018'),
    items: [1, 7]
  },
  {
    date: new Date('03 04 2018'),
    items: [8, 1, 4]
  },
  {
    date: new Date('03 05 2018'),
    items: [4, 5, 6, 8]
  }
]

MealModel.insertMany(MEALS).then(meals => {
  let mealIds = meals.map(meal => meal['_id'])
  let items = []
  ITEMS.forEach(ITEM => {
    items.push({meal: mealIds[ITEM[0]], quantity: ITEM[1], unit_price: ITEM[2]})
  })
  return ItemModel.insertMany(items)
}).then(items => {
  let itemIds = items.map(item => item['_id'])
  let orders = []
  ORDERS.forEach(ORDER => {
    let order_items = []
    ORDER['items'].forEach(item => {
      order_items.push(itemIds[item])
    })
    orders.push({date: ORDER['date'], items: order_items})
  })

  return OrderModel.insertMany(orders)
}).then(orders => {
  process.exit(0)
}).catch(err => {
  console.log(err)
})
