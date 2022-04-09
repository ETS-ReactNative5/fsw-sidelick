const router = require("express").Router();
const {Register, Login} = require("../controllers/authController");

// Register

router.post("/register", Register);

// LOGIN

router.post("/login", Login);

module.exports = router;
