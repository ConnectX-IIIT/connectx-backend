const express = require("express");
const { vote } = require("../controllers/post/vote");
const { verifyToken } = require("../middlewares/auth_middleware");

const router = express.Router();

router.post("/vote/:key", verifyToken, vote);

module.exports = router;