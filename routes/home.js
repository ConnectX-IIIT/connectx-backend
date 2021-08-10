const express = require("express");
const multer = require('multer');
const { addPost } = require("../controllers/home/add_post");
const { search } = require("../controllers/home/search");
const { verifyToken } = require("../middlewares/auth_middleware");

const upload = multer({ dest: 'assets' });
const router = express.Router();

router.get("/search/:key", verifyToken, search);
router.route('/addpost').post(verifyToken, upload.array('attachedImgs'), addPost);

module.exports = router;