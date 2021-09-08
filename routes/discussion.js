const express = require("express");
const { removeDiscussion } = require("../controllers/discussion/remove_discussion");
const { vote } = require("../controllers/discussion/vote");
const { verifyToken } = require("../middlewares/auth_middleware");
const { getDiscussions } = require("../controllers/discussion/get_discussions");
const { isUserVerified } = require("../middlewares/user_verified");
const { updateDiscussion } = require("../controllers/discussion/update_discussion");

const router = express.Router();

router.post("/vote/:key", verifyToken, isUserVerified, vote);
router.post("/updatediscussion/:discussionId", verifyToken, isUserVerified, updateDiscussion);
router.get("/remove/:key", verifyToken, isUserVerified, removeDiscussion);
router.post("/getdiscussions", verifyToken, getDiscussions);

module.exports = router;