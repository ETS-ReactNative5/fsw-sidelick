const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
	from: {
		type: String,	
	},
	to : {
		type: String,
	},
	duration : {
		type: Number,
	},
	status: {
		type: Boolean,
	},
	createdAt: {
		type: Date,
		expires: "5m",
		immutable: true,
		default: Date.now
		// default: () => Date.now(),
	},
	updatedAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Request', requestSchema);