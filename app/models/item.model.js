'use strict';

const _ = require('lodash');

const ItemSchema = new mongoose.Schema({
	meal: {type: mongoose.Schema.Types.ObjectId, ref: 'Meal'},
	quantity: mongoose.Schema.Types.Number,
	unit_price: mongoose.Schema.Types.Number
}, {
	timestamps: false
});

module.exports = mongoose.model('Item', ItemSchema);

module.exports.ItemSchema = ItemSchema;
