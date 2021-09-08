const express = require("express");
const { removeComment } = require("../controllers/comment/remove_comment");
const { vote } = require("../controllers/comment/vote");
const { verifyToken } = require("../middlewares/auth_middleware");
const { getComments } = require("../controllers/comment/get_comments");
const { isUserVerified } = require("../middlewares/user_verified");
const { updateComment } = require("../controllers/comment/update_comment");

const router = express.Router();

router.post("/vote/:key", verifyToken, isUserVerified, vote);
router.post("/updatecomment/:commentId", verifyToken, isUserVerified, updateComment);
router.get("/remove/:key", verifyToken, isUserVerified, removeComment);
router.post("/getcomments", verifyToken, getComments);

module.exports = router;