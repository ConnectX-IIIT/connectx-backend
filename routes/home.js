const express = require("express");
const multer = require('multer');
const { addPost } = require("../controllers/home/add_post");
const { addQuestion } = require("../controllers/home/add_question");
const { search } = require("../controllers/home/search");
const { verifyToken } = require("../middlewares/auth_middleware");

const storage = multer.diskStorage({});
const upload = multer({ storage });
const router = express.Router();

router.get("/search/:key", verifyToken, search);
router.route('/addpost').post(verifyToken, upload.array('attachedImgs'), addPost);
router.post('/addquestion', verifyToken, addQuestion);

module.exports = router;