const express = require("express");
const { addPost } = require("../controllers/home/add_post");
const { getPost } = require("../controllers/home/get_post");
const { search } = require("../controllers/home/search");
const { verifyToken } = require("../middlewares/auth_middleware");
const router = express.Router();

router.get("/search/:key", verifyToken, search);
router.get("/posts", verifyToken, getPost);
router.get("/addpost", verifyToken, addPost);

module.exports = router;