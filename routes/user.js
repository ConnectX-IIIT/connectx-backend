const express = require("express");
const { getDetails } = require("../controllers/user/get_details");
const { verifyToken } = require("../middlewares/auth_middleware");
const router = express.Router();

router.get('/getdetails', verifyToken, getDetails);

module.exports = router;