const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
	latitude:{
		type: Number ,
	},
	longitude: {
		type: Number ,
	},
});

const requestSchema = new mongoose.Schema({
	from: {
		type: String,
	},
	to : {
		type: String,
	},
	status: {
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

const userSchema = new mongoose.Schema({
	fullName: {
		type: String,
		trim:true,
		min: 2,
		max: 255
	},
	email: {
		type: String,
		lowercase: true,
		trim:true,
		unique: true,
		min: 6,
		max: 255
	},
	password: {
		type: String,
		max: 1024,
		min: 6
	},
	status: {
		type: Boolean,
		default: false,
	},
	gender:{
		type: String,
	},
	phoneNumber:{
		type: Number,
	},
	location: {
		type: locationSchema,
		default: () => ({})
	},
	request:{
		type: requestSchema,
		default: () => ({})
	},
	image:{
		type: String,
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

module.exports = mongoose.model('User', userSchema);