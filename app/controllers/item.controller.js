'use strict';

const express = require('express');
const router = express.Router();
const ItemModel = require('../models/item.model');
const ErrorHelper = require('../helpers/error-helper');

const index = async function(req, res) {
  try {
    let items = await ItemModel.find({}, {__v: 0}).populate('meal').exec();
    res.send(items);
  } catch(err) {
    ErrorHelper.handleError(res, err, 400);
  }
};

const get = async function(req, res) {
  try {
    let item = await ItemModel.findById(req.params.id).populate('meal').exec();
    if (item == null) throw new Error('ITEM_ID_NOT_FOUND');
    res.send(item);
  } catch(err) {
    ErrorHelper.handleError(res, err, 400);
  }
};

const create = async function(req, res) {
  try {
    let item = new ItemModel(req.body);
    await item.save();
    res.send(item);
  } catch(err) {
    ErrorHelper.handleError(res, err, 400);
  }
};

const update = async function(req, res) {
  try {
    await ItemModel.update({_id: req.params.id}, req.body).exec();
    let item = await ItemModel.findById(req.params.id).exec();
    if (item == null) throw new Error('ITEM_ID_NOT_FOUND');
    res.send(item);
  } catch(err) {
    ErrorHelper.handleError(res, err, 400);
  }
};

const destroy = async function(req, res) {
  try {
    await ItemModel.deleteOne({_id: req.params.id});
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
