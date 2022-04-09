const router = require('express').Router();
const User = require('../models/User');
const verify = require('./verifyToken');

router.get('/', verify, (req,res) => {
	// res.json({
	// 	posts: {
	// 		title:'my first post',
	// 		description: 'random data you shouldnt access'
	// 	}
	// });
	res.json(req.user);
	// if we want to get that user based on that token we can just say 
	// User.findOne({_id: req.user});
});

module.exports = router;