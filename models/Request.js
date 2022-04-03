const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	  },
	from:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    to :[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
	Reqstatus: {
		type: String,
		default: "pending",
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
	}
});


module.exports = mongoose.model('Request', requestSchema);