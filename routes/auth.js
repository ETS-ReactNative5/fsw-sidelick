const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  // LET'S VALIDATE THE DATA BEFORE WE MAKE A USER
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // Checking if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).json({ message: "Email Already Exists" });

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user
  const user = new User({
    fullName: req.body.fullName,
    status: req.body.status,
    email: req.body.email,
    password: hashedPassword,
    gender: req.body.gender,
    phoneNumber: req.body.phoneNumber,
  });
  try {
    await user.save();
    user.status
      ? res
          .status(201)
          .json({
            message: `${user.fullName} successfully registered and has this id: ${user._id} as a walker`,
          })
      : res
          .status(201)
          .json({
            message: `${user.fullName} successfully registered and has this id: ${user._id} as a customer`,
          });
  } catch (err) {
    res.status(400).json(err);
  }
});

// LOGIN

router.post("/login", async (req, res) => {
  // LET'S VALIDATE THE DATA BEFORE WE MAKE A USER
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // Checking if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ message: "Email is not found" });

  // Check if Password is Correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res.status(400).json({ message: "Password is incorrect" });

  // Create and assign a token
  const token = jwt.sign(
    {
      _id: user._id,
      expire: Date.now() + 1000 * 60 * 60, //1 hour
    },
    process.env.TOKEN_SECRET,
  );
  // save user token
  res.header('Authorization', `Bearer ${token}`).json({ token });
});

module.exports = router;
