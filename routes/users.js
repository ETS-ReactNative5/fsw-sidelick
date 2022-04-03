const router = require("express").Router();
const User = require("../models/User");
const Request = require("../models/Request");
const bcrypt = require("bcryptjs");
const verifyToken = require("./verifyToken");

router.get("/get-walkers", verifyToken, async (req, res) => {
  try {
    const walkers = await User.find({ status: true });
    const walkersInfo = await walkers.map((walker) => [
      { id: walker.id },
      { fullName: walker.fullName },
      { latitude: walker.location.latitude },
      { longitude: walker.location.longitude },
      { image : walker.image },
      { age: walker.age },
      { phoneNumber: walker.phoneNumber}
    ]);

    return res.status(201).json(walkersInfo);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.post("/location", verifyToken, async (req, res) => {
  try {
    const update = {
      location: { latitude: req.body.latitude, longitude: req.body.longitude },
    };
    const filter = req.user._id;
    const updatedDocument = await User.findOneAndUpdate(
      { _id: req.user._id },
      update,
      {
        new: true,
      }
    );
    return res.status(201).json(updatedDocument);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.post("/update-user", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const emailExist = await User.findOne({ email: req.body.email });
    
    if (emailExist && user.email !== req.body.email){
      return res.status(400).json({ message: "Email Already Exists"});}
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res.status(400).json({ message: "Password is incorrect" });

    const update = {
      fullName: req.body.fullName,
      email: req.body.email,
    };
    const updatedDocument = await User.findOneAndUpdate(
      { _id: req.user._id },
      update,
      {
        new: true,
      }
    );

    return res.status(201).json(updatedDocument);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.post("/post-image", verifyToken, async(req, res) => {
  try{
    const update = {
      image: req.body.image
    };
    const updatedDocument = await User.findOneAndUpdate(
      { _id: req.user._id },
      update,
      {
        new: true,
      }
    );
    return res.status(200).json(updatedDocument);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.get("/get-user", verifyToken, async(req,res) => {
  try{
    const user = await User.findById(req.user._id)
    return res.status(201).json(user);
  }catch(err){
    return res.status(400).json(err);
  }
})

router.post("/send-request", verifyToken, async (req, res) => {
  try {
    // const reqs = await User.findById(req.user._id);
    // console.log("REQUESTS:", reqs);
    // (!await reqs) ? console.log("ONE No requests found" ) : 
    // await reqs?.map((data) => {console.log("DATA:",data)(
    //   data.from == reqs[0].from
    //     ? ( data.Reqstatus == 'pending'
    //       ? console.log("Request already sent")
    //       : console.log("Request sent!") )
    //     : console.log("TWO No requests found")
    //   )}
    // );
    // #######################
    const user = await User.findOne(req.user._id);
    const request = new Request({
      from: 'Hello',
      to: 'Try something',
      user: req.user._id
    });
    await request.save();
    console.log(request);
    user.requests.push(request);
    await user.save();
    // #######################
        res.status(200).json("Success");
      } catch (err) {
        return res.status(400).json(err);
      }
    });

router.get("/get-request", verifyToken, async (req, res) => {
  try {
    const userRequest = await User.findById(req.user._id);
    if (!userRequest.request)
      return res.status(400).json({ message: "No request sent" });
    const requestInfo = await userRequest.map((data) => [
      { from: data.from },
      { to: data.to },
      { Reqstatus: data.Reqstatus },
    ]);
    return res.status(201).json(requestInfo);
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;
