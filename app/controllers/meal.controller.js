'use strict';

const express = require('express');
const router = express.Router();
const MealModel = require('../models/meal.model');
const ErrorHelper = require('../helpers/error-helper');

const index = async function(req, res) {
  try {
    let meals = await MealModel.find({}, {__v: 0}).exec();
    res.send(meals);
  } catch(err) {
    ErrorHelper.handleError(res, err, 400);
  }
};

const get = async function(req, res) {
  try {
    let meal = await MealModel.findById(req.params.id).exec();
    if (meal == null) throw new Error('MEAL_ID_NOT_FOUND');
    res.send(meal);
  } catch(err) {
    ErrorHelper.handleError(res, err, 400);
  }
};

const create = async function(req, res) {
  try {
    let meal = new MealModel(req.body);
    await meal.save();
    res.send(meal);
  } catch(err) {
    ErrorHelper.handleError(res, err, 400);
  }
};

const update = async function(req, res) {
  try {
    await MealModel.update({_id: req.params.id}, req.body).exec();
    let meal = await MealModel.findById(req.params.id).exec();
    if (meal == null) throw new Error('MEAL_ID_NOT_FOUND');
    res.send(meal);
  } catch(err) {
    ErrorHelper.handleError(res, err, 400);
  }
};

const destroy = async function(req, res) {
  try {
    await MealModel.deleteOne({_id: req.params.id});
    res.send(true);
  } catch(err) {
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
