const express = require("express");
const { verifyToken } = require("../middlewares/auth_middleware");
const { getQuestions } = require("../controllers/question/get_questions");

const router = express.Router();

router.get("/getquestions/:key", verifyToken, getQuestions);

module.exports = router;