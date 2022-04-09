const User = require("../models/User");
const Request = require("../models/Request");
const bcrypt = require("bcryptjs");

const getWalkers = async (req, res) => {
	try {
	  const walkers = await User.find({ status: true });
	  const walkersInfo = await walkers.map((walker) => [
		{ id: walker.id },
		{ fullName: walker.fullName },
		{ latitude: walker.location.latitude },
		{ longitude: walker.location.longitude },
		{ image: walker.image },
		{ age: walker.age },
		{ phoneNumber: walker.phoneNumber },
	  ]);
  
	  return res.status(201).json(walkersInfo);
	} catch (err) {
	  return res.status(400).json(err);
	}
  };

const getLocation = async (req, res) => {
	try {
	  const update = {
		location: { latitude: req.body.latitude, longitude: req.body.longitude },
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
  };

  const updateUser = async (req, res) => {
	try {
	  const user = await User.findById({ _id: req.user._id });
	  const emailExist = await User.findOne({ email: req.body.email });
  
	  if (emailExist && user.email !== req.body.email) {
		return res.status(400).json({ message: "Email Already Exists" });
	  }
  
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
  };

  const getUser = async (req, res) => {
	try {
	  const user = await User.findById({ _id: req.user._id });
	  return res.status(201).json(user);
	} catch (err) {
	  return res.status(400).json(err);
	}
  };

  const uploadImage = async (req, res) => {
	try {
	  const update = {
		image: req.body.image,
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
  };

  const sendRequest = async (req, res) => {
	try {
	  let bool = false;
	  const user = await User.findById({ _id: req.user._id });
	  const userReq = await Request.find({ _id: user.request });
	  !userReq
		? CreateRequest.call()
		: await userReq?.map((data) => {
			if (data.to === req.body.to && data.Reqstatus === "pending") {
			  bool = true;
			  return;
			}
		  });
	  if (!bool) {
		CreateRequest.call();
	  } else {
		return res.status(406).json("Request already sent!");
	  }
	  // #######################
	  async function CreateRequest () {
		const request = new Request({
		  from: user.fullName,
		  to: req.body.to,
		  Reqstatus: "pending",
		});
		await request.save();
		user.request.push(request);
		await user.save();
	  };
	  // #######################
	  return res.status(200).json("Success");
	} catch (err) {
	  return res.status(400).json(err);
	}
  };

  const getRequest = async (req, res) => {
	  try {
	  const user = await User.findById({ _id: req.user._id });
	  const receivers = await Request.find({ _id: user.request}).populate("to", "fullName image")
	  console.log(receivers)
// 	  const userReq = await Request.find({ _id: user.request });
// 	  console.log(userReq);
	  if (!receivers)
		return res.status(400).json({ message: "No request sent" });
// 	  const requestInfo = await userReq.map(async(data) => 
// [		{ id: data._id},
// 		{ from: data.from },
// 		{ to: data.to },
// 		{ Reqstatus: data.Reqstatus },]
//   );
	  return res.status(201).json(receivers);
	} catch (err) {
	  return res.status(400).json(err);
	}
  };

  const deleteRequest = async(req,res)=>{
	try{
	  const data = await Request.deleteOne(req.params)
	return res.status(201).json({message:"Request deleted successfully"})
  }catch(err){
	return res.status(400).json(err);
  }
  };

module.exports.getWalkers = getWalkers;
module.exports.getLocation = getLocation;
module.exports.updateUser = updateUser;
module.exports.getUser = getUser;
module.exports.uploadImage = uploadImage;
module.exports.sendRequest = sendRequest;
module.exports.getRequest = getRequest;
module.exports.deleteRequest = deleteRequest;
