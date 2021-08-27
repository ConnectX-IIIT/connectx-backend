const express = require("express");
const multer = require('multer');
const { addPost } = require("../controllers/home/add_post");
const { addQuestion } = require("../controllers/home/add_question");
const { fetchUsers } = require("../controllers/home/fetch_users");
const { search } = require("../controllers/home/search");
const { verifyToken } = require("../middlewares/auth_middleware");
const { isUserVerified } = require("../middlewares/user_verified");

const storage = multer.diskStorage({});
const upload = multer({ storage });
const router = express.Router();

router.get("/search/:key", verifyToken, search);
router.route('/addpost').post(verifyToken, isUserVerified, upload.array('attachedImgs'), addPost);
router.post('/addquestion', verifyToken, isUserVerified, addQuestion);
router.get('/fetchusers', verifyToken, fetchUsers);

module.exports = router;