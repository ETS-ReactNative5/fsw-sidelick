const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	fullName: {
		type: String,
		required: true,
		trim:true,
		min: 2,
		max: 255
	},
	// lastName: {
	// 	type: String,
	// 	required: true,
	// 	trim:true,
	// 	min: 2,
	// 	max: 255
	// },
	email: {
		type: String,
		required: true,
		lowercase: true,
		trim:true,
		unique: true,
		min: 6,
		max: 255
	},
	password: {
		type: String,
		required: true,
		max: 1024,
		min: 6
	},
	createdAt: {
		type: Date,
		immutable: true,
		default: Date.now
		// default: () => Date.now(),
	},
	updatedAt: {
		type: Date,
		default: Date.now
		// default: () => Date.now(),
	}
});

module.exports = mongoose.model('User', userSchema);