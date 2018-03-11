const path = require('path');

module.exports = function (app) {
	app.use('/api/v1/order', require('../controllers/order.controller'));
	app.use('/api/v1/item', require('../controllers/item.controller'));
	app.use('/api/v1/meal', require('../controllers/meal.controller'));
};
