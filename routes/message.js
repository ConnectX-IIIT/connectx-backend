const express = require("express");
const { verifyToken } = require("../middlewares/auth_middleware");
const { addMessage } = require("../controllers/message/add_message");
const { getMessages } = require("../controllers/message/get_messages");

const router = express.Router();

router.get("/getmessages/:key", verifyToken, getMessages);
router.post("/addmessage/:key", verifyToken, addMessage);

module.exports = router;