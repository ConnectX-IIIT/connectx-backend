const express = require("express");
const { removePost } = require("../controllers/post/remove_post");
const { vote } = require("../controllers/post/vote");
const { verifyToken } = require("../middlewares/auth_middleware");

const router = express.Router();

router.post("/vote/:key", verifyToken, vote);
router.get("/remove/:key", verifyToken, removePost);

module.exports = router;