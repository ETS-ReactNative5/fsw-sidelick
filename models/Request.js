const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
	from:{
        type: String,
    },
    to :{
        type: String,
    },
	email:{
		type:String,
	},
	Reqstatus: {
		type: String,
		default: "pending",
	},
	createdAt: {
		type: Date,
		default: Date.now
		// default: () => Date.now(),
	},
	updatedAt: {
		type: Date,
		default: Date.now
	}
});


module.exports = mongoose.model('Request', requestSchema);