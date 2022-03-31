const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const verifyToken = require("./verifyToken");

router.get("/get-walkers", verifyToken, async (req, res) => {
  try {
    const walkers = await User.find({ status: true });
    const walkersInfo = await walkers.map((walker) => [walker.fullName, walker.location]);

    return res.status(201).json(walkersInfo);
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
    res.status(201).json(updatedDocument);
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
    const updatedDocument = await User.findOneAndUpdate({_id: req.user._id}, update, {
      new: true,
    });

    return res.status(201).json(updatedDocument);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.post("/send-request", verifyToken, async(req,res)=>{
  try{
    // const reqexist = await User.findOne(req.user._id);
    // if (reqexist)
    //   return res.status(400).json({ message: "Request Already Exists" });
    const update = { request:{ to : req.body.to }};
    const updatedDocument = await User.findOneAndUpdate({_id: req.user._id}, update, {
      new: true,
    });
    res.status(201).json(updatedDocument);
  }catch(err){
    return res.status(400).json(err);
  }
});

router.get("/get-request", verifyToken, async(req,res)=>{
  try{
    const userRequest = await User.findById(req.user._id)
    if (!userRequest.request) return res.status(400).json({ message: "No request sent" });
    const requestInfo = await userRequest.map((data) => [data.from, data.to, data.status]);
    return res.status(201).json(requestInfo);

  }catch(err){
    return res.status(400).json(err);
  }
});

module.exports = router;
