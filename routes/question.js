const express = require("express");
const { verifyToken } = require("../middlewares/auth_middleware");
const { getQuestions } = require("../controllers/question/get_questions");
const { vote } = require("../controllers/question/vote");
const { removeQuestion } = require("../controllers/question/remove_question");

const router = express.Router();

router.get("/getquestions/:key", verifyToken, getQuestions);
router.get("/remove/:key", verifyToken, removeQuestion);
router.post("/vote/:key", verifyToken, vote);

module.exports = router;