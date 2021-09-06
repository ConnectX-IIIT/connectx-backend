const express = require("express");
const { addReport } = require("../controllers/report/add_report");
const { verifyToken } = require("../middlewares/auth_middleware");
const { isUserVerified } = require("../middlewares/user_verified");

const router = express.Router();

router.post("/addreport/:referenceId", verifyToken, isUserVerified, addReport);

module.exports = router;