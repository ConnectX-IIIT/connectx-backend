const express = require("express");
const multer = require('multer');
const { getDetails } = require("../controllers/user/get_details");
const { getImage } = require("../controllers/user/get_image");
const { removeImage } = require("../controllers/user/remove_image");
const { uploadPicture } = require("../controllers/user/upload_picture");
const { verifyToken } = require("../middlewares/auth_middleware");

const upload = multer({ dest: 'assets' });
const router = express.Router();

router.get('/getdetails', verifyToken, getDetails);
router.get('/fetch/:key', getImage);
router.post('/remove/:key', verifyToken, removeImage);
router.route('/upload').post(verifyToken, upload.single('photo'), uploadPicture);

module.exports = router;