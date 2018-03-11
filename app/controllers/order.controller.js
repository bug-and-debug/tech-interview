'use strict';

const express = require('express');
const router = express.Router();
const OrderModel = require('../models/order.model');
const MealModel = require('../models/meal.model');
const ErrorHelper = require('../helpers/error-helper');

const index = async function(req, res) {
  try {
    let orders = await OrderModel.find({}, {__v: 0}).populate('items').lean().exec();
    for (let order of orders) {
      for (let item of order['items']) {

        let meal = await MealModel.findById(item['meal']).lean().exec();
        if (meal == null) throw new Error('MEAL_ID_NOT_FOUND');
        item['name'] = meal['name']
        item['total_price'] = item['unit_price'] * item['quantity']
      }
    }

    orders.forEach(order => {
      order['items'].forEach(item => {
        delete item['_id']
        delete item['meal']
        delete item['unit_price']
        delete item['__v']
      })
    })
    res.send(orders);
  } catch(err) {
    ErrorHelper.handleError(res, err, 400);
  }
};

const get = async function(req, res) {
  try {
    let order = await OrderModel.findOne({_id: req.params.id}, {__v: 0}).populate('items').lean().exec();
    if (order == null) throw new Error('ORDER_ID_NOT_FOUND');
    for (let item of order['items']) {
      let meal = await MealModel.findById(item['meal']).lean().exec();
      if (meal == null) throw new Error('MEAL_ID_NOT_FOUND');
      item['name'] = meal['name']
      item['total_price'] = item['unit_price'] * item['quantity']
    }
    order['items'].forEach(item => {
      delete item['_id']
      delete item['meal']
      delete item['unit_price']
      delete item['__v']
    })
    res.send(order);
  }
  catch(err) {
    ErrorHelper.handleError(res, err, 400);
  }
};

const create = async function(req, res) {

  try {
    let newOrder = new OrderModel(new Date(req.body.date));

    newOrder.addItems(req.body.items);
    await newOrder.save();

    newOrder = await OrderModel.findById(newOrder._id).populate('items').exec();
    res.send(newOrder);

  }
  catch(err) {
    console.log(err);
    ErrorHelper.handleError(res, err, 400);
  }

};

const update = async function(req, res) {
  try {
    await OrderModel.update({_id: req.params.id}, req.body).exec();
    let order = await OrderModel.findById(req.params.id).populate('items').exec();
    if (order == null) throw new Error('ORDER_ID_NOT_FOUND');
    res.send(order);
  }
  catch(err) {
    ErrorHelper.handleError(res, err, 400);
  }
};

const destroy = async function(req, res) {
  try {
    await OrderModel.deleteOne({_id: req.params.id});
    res.send(true);
  }
  catch(err) {
    ErrorHelper.handleError(res, err, 400);
  }
}

// routes
router.get('/', index);
router.get('/:id', get);
router.post('/', create);
router.put('/:id',  update);
router.delete('/:id', destroy);

module.exports = router;
