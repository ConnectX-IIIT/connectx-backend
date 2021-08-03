const express = require("express");
const { getPost } = require("../controllers/home/get_post");
const { search } = require("../controllers/home/search");
const { verifyToken } = require("../middlewares/auth_middleware");
const router = express.Router();

router.get("/search/:key", verifyToken, search);
router.get("/posts", verifyToken, getPost);

module.exports = router;