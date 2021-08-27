const express = require("express");
const { removePost } = require("../controllers/post/remove_post");
const { vote } = require("../controllers/post/vote");
const { getPosts } = require("../controllers/post/get_posts");
const { verifyToken } = require("../middlewares/auth_middleware");
const { addDiscussion } = require("../controllers/post/add_discussion");
const { isUserVerified } = require("../middlewares/user_verified");

const router = express.Router();

router.post("/vote/:key", verifyToken, isUserVerified, vote);
router.get("/remove/:key", verifyToken, isUserVerified, removePost);
router.get("/getposts/:key", verifyToken, getPosts);
router.post("/adddiscussion", verifyToken, isUserVerified, addDiscussion);

module.exports = router;