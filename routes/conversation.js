const express = require("express");
const { verifyToken } = require("../middlewares/auth_middleware");
const { addConversation } = require("../controllers/conversation/add_conversation");
const { getConversations } = require("../controllers/conversation/get_conversations");

const router = express.Router();

router.post("/getconversations", verifyToken, getConversations);
router.post("/addconversation", verifyToken, addConversation);

module.exports = router;