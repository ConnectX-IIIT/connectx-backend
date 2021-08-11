const express = require("express");
const { removePost } = require("../controllers/post/remove_post");
const { vote } = require("../controllers/post/vote");
const { getPosts } = require("../controllers/post/get_posts");
const { verifyToken } = require("../middlewares/auth_middleware");
const { addDiscussion } = require("../controllers/post/add_discussion");
const { getDiscussions } = require("../controllers/post/get_discussions");

const router = express.Router();

router.post("/vote/:key", verifyToken, vote);
router.get("/remove/:key", verifyToken, removePost);
router.get("/getposts/:key", verifyToken, getPosts);
router.post("/adddiscussion", verifyToken, addDiscussion);
router.get("/getdiscussions", verifyToken, getDiscussions);

module.exports = router;