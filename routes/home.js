const express = require("express");
const { search } = require("../controllers/home/search");
const { verifyToken } = require("../middlewares/auth_middleware");
const router = express.Router();

router.get("/search/:key", verifyToken, search);

module.exports = router;