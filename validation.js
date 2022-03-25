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
// Form Validation
const formValidation = data => {
	const schema = Joi.object({
  		age: Joi.number().trim()
  			.min(13)
  			.required(),
		gender: Joi.string().trim()
			.required,
  		phoneNumber: Joi.number().trim()
  			.required()
	});
	return schema.validate(data)
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.formValidation = formValidation;