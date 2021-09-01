const express = require("express");
const { verifyToken } = require("../middlewares/auth_middleware");
const { vote } = require("../controllers/answer/vote");
const { isUserVerified } = require("../middlewares/user_verified");
const { getAnswers } = require("../controllers/answer/get_answers");

const router = express.Router();

router.post("/getanswers", verifyToken, getAnswers);
router.post("/vote/:key", verifyToken, isUserVerified, vote);

module.exports = router;