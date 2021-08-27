const express = require("express");
const { verifyToken } = require("../middlewares/auth_middleware");
const { addMessage } = require("../controllers/message/add_message");
const { getMessages } = require("../controllers/message/get_messages");
const { isUserVerified } = require("../middlewares/user_verified");

const router = express.Router();

router.get("/getmessages/:key", verifyToken, isUserVerified, getMessages);
router.post("/addmessage/:key", verifyToken, isUserVerified, addMessage);

module.exports = router;