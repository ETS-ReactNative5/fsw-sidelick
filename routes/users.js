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
    res.status(200).json(updatedDocument);
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

router.get("/update-user", verifyToken, async(req,res) => {
  try{
    const update = {
      User: { fullName: req.body.fullName, email: req.body.email, password: req.body.password },
    };
    const updatedDocument = await User.findOneAndUpdate(
      { _id: req.user._id },
      update,
      {
        new: true,
      }
    );
    res.status(200).json(updatedDocument);
  } catch (err) {
    return res.status(400).json(err);
  }
})

router.post("/send-request", verifyToken, async (req, res) => {
  try {
    // const person = await User.findById(req.user._id);
    // console.log("PERSON:",person); 
    // (!await person.request) ? console.log("No requests found" ) : 
    // console.log("PERSON REQ:",personReq, "PERSON REQ ENDS")
    // const reqExists = await personReq?.map((data) => {console.log("DATA:",data)(
    //   data.to === request.body.user_id
    //     ? ( data.status == "pending"
    //       ? { message: "Request already sent" }
    //       : { message: "Request sent!" } )
    //     : { message: "No requests found" }
    //   )}
    // );

    // #######################
    const newreq = new Request({from:req.body.from, to:req.body.to, Reqstatus: req.body.Reqstatus});
   await newreq.save();
    // #######################

    // const receiver = req.body.to;
    // if (personReq)
    // if (reqexist)
    //   return res.status(400).json({ message: "Request Already Exists" });
    // const update = { request: { to: req.body.to } };
    // const updatedDocument = await User.findOneAndUpdate(
      //   { _id: req.user._id },
      //   update,
      //   {
        //     new: true,
        //   }
        // );
        res.status(200).json(newreq);
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
