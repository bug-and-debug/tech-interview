'use strict';

const MealSchema = new mongoose.Schema({
	name: mongoose.Schema.Types.String,
	code: mongoose.Schema.Types.String,
	byline: mongoose.Schema.Types.String
}, {
	timestamps: false
})

module.exports = mongoose.model('Meal', MealSchema);

module.exports.MealSchema = MealSchema;
