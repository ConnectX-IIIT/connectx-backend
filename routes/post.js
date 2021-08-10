const express = require("express");
const { removePost } = require("../controllers/post/remove_post");
const { vote } = require("../controllers/post/vote");
const { getPosts } = require("../controllers/post/get_posts");
const { verifyToken } = require("../middlewares/auth_middleware");

const router = express.Router();

router.post("/vote/:key", verifyToken, vote);
router.get("/remove/:key", verifyToken, removePost);
router.get("/getposts", verifyToken, getPosts);

module.exports = router;