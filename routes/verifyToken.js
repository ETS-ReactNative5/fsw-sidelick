// const jwt = require('jsonwebtoken');

// // middleware function that we can add to routes that we want to be protected
// module.exports = function(req, res, next){
// 	const token = req.header('Authorization');
// 	if(!token) return res.status(401).json({message: "Access denied!"});

// 	try{
// 		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
// 		// this is gonna give us the payload part
// 		req.user = verified;
// 		next();
// 	}catch (err){
// 		res.status(400).json({ message: 'Invalid Token'});
// 	}
// };

const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access denied!" });

  jwt.verify(token, process.env.TOKEN_SECRET);
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    // this is gonna give us the payload part
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
