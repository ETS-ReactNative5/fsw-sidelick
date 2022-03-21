const  jwt = require('jsonwebtoken');

// middleware function that we can add to routes that we want to be protected
module.exports = function(req, res, next){
	const token = req.header('auth-token');
	if(!token) return res.status(401).json({message: "Access denied!"});

	try{
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		// this is gonna give us the payload part
		req.user = verified;
		next();
	}catch (err){
		res.status(400).json({ message: 'Invalid Token'});
	}
};