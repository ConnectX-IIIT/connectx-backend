const express = require("express");
const { addReport } = require("../controllers/report/add_report");
const { getReports } = require("../controllers/report/get_reports");
const { verifyToken } = require("../middlewares/auth_middleware");
const { isUserVerified } = require("../middlewares/user_verified");

const router = express.Router();

router.post("/addreport/:referenceId", verifyToken, isUserVerified, addReport);
router.get("/getreports", verifyToken, isUserVerified, getReports);

module.exports = router;