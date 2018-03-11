require('../setup')
const ItemModel = require('../models/item.model');
const MealModel = require('../models/meal.model');
const OrderModel = require('../models/order.model');
const config = require('./../config');

Promise.all([
  MealModel.remove({}),
  ItemModel.remove({}),
  OrderModel.remove({})
]).then(() => {
  console.log('flushed')
  process.exit(0)
}).catch(err => {
  conole.log(err)
})
