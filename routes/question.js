const express = require("express");
const { verifyToken } = require("../middlewares/auth_middleware");
const { getQuestions } = require("../controllers/question/get_questions");
const { vote } = require("../controllers/question/vote");
const { removeQuestion } = require("../controllers/question/remove_question");
const { isUserVerified } = require("../middlewares/user_verified");
const { addAnswer } = require("../controllers/question/add_answer");

const router = express.Router();

router.post("/addanswer/:questionId", verifyToken, isUserVerified, addAnswer);
router.get("/getquestions/:key", verifyToken, getQuestions);
router.post("/getquestions", verifyToken, getQuestions);
router.get("/remove/:key", verifyToken, isUserVerified, removeQuestion);
router.post("/vote/:key", verifyToken, isUserVerified, vote);

module.exports = router;