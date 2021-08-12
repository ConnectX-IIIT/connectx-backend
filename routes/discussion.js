const express = require("express");
const { removeDiscussion } = require("../controllers/discussion/remove_discussion");
const { vote } = require("../controllers/discussion/vote");
const { verifyToken } = require("../middlewares/auth_middleware");
const { getDiscussions } = require("../controllers/discussion/get_discussions");

const router = express.Router();

router.post("/vote/:key", verifyToken, vote);
router.get("/remove/:key", verifyToken, removeDiscussion);
router.post("/getdiscussions", verifyToken, getDiscussions);

module.exports = router;