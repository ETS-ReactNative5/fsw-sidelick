const router = require("express").Router();
const {getWalkers, getLocation, updateUser, getUser, uploadImage, sendRequest, getRequest, deleteRequest} = require("../controllers/userController");

router.get("/get-walkers",verifyToken, getWalkers);

router.post("/location", verifyToken, getLocation);

router.post("/update-user", verifyToken, updateUser);

router.post("/post-image", verifyToken, uploadImage);

router.get("/get-user", verifyToken, getUser);

router.post("/send-request", verifyToken, sendRequest);

router.get("/get-request", verifyToken, getRequest);

router.delete("/delete-request/:_id", verifyToken, deleteRequest);

module.exports = router;
