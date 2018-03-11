'use strict';

const _ = require('lodash');
const shortid = require('short-id');
const CommonHelper = require('../helpers/common.helper.js');

const OrderSchema = new mongoose.Schema({
	//slug: mongoose.Schema.Types.String,
	date: { type: mongoose.Schema.Types.Date, default: Date.now },
	items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
}, {
	timestamps: false
});

OrderSchema.methods.addItems = function(items) {
	items.forEach(item => {
		this.items.push(item);
	})
};

module.exports = mongoose.model('Order', OrderSchema);
module.exports.OrderSchema = OrderSchema;
