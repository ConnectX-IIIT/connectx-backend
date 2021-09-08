const express = require("express");
const { verifyToken } = require("../middlewares/auth_middleware");
const { vote } = require("../controllers/answer/vote");
const { isUserVerified } = require("../middlewares/user_verified");
const { getAnswers } = require("../controllers/answer/get_answers");
const { addComment } = require("../controllers/answer/add_comment");
const { removeAnswer } = require("../controllers/answer/remove_answer");
const { updateAnswer } = require("../controllers/answer/update_answer");

const router = express.Router();

router.post("/getanswers", verifyToken, getAnswers);
router.post("/addcomment", verifyToken, isUserVerified, addComment);
router.post("/updateanswer/:answerId", verifyToken, isUserVerified, updateAnswer);
router.get("/remove/:key", verifyToken, isUserVerified, removeAnswer);
router.post("/vote/:key", verifyToken, isUserVerified, vote);

module.exports = router;