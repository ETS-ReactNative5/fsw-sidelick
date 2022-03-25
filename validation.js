const Joi = require('@hapi/joi');

// Register Validation
const registerValidation = data => {
	const schema = Joi.object({
  		fullName: Joi.string()
  			.min(2)
  			.required(),
		status: Joi.boolean()
		.required(),
  		email: Joi.string()
  			.min(6)
  			.required()
  			.email(),
		age: Joi.number().trim()
			.required()
			.max(2),
		phoneNumber: Joi.number().trim()
			.required(),
		gender: Joi.string().trim()
			.required(),
  		password: Joi.string()
  			.min(6)
  			.required()
	});
	return schema.validate(data)
}

// Login Validation
const loginValidation = data => {
	const schema = Joi.object({
  		email: Joi.string().trim()
  			.min(6)
  			.required()
  			.email(),
  		password: Joi.string().trim()
  			.min(6)
  			.required()
	});
	return schema.validate(data)
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;