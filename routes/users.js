const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const verifyToken = require("./verifyToken");

router.get("/get-walkers", verifyToken, async (req, res) => {
  try {
    const walkers = await User.find({ status: true });
    const walkersInfo = await walkers.map((walker) => [walker.fullName, walker.location]);

    return res.status(201).send(walkersInfo);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.post("/location", verifyToken, async (req, res) => {
  try {
    const update = { location:{latitude: req.body.latitude, longitude: req.body.longitude }};
    const filter = req.user._id;
    const updatedDocument = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(200).send(updatedDocument.location);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/update", verifyToken, async (req, res) => {
  try {
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
      return res.status(400).json({ message: "Email Already Exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const update = {
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashedPassword,
    };
    const filter = req.user._id;
    const updatedDocument = await User.findOneAndUpdate(filter, update, {
      new: true,
    });

    return res.status(200).send(updatedDocument);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.get("/send-request", verifyToken, async(res,req)=>{
  
})

module.exports = router;
