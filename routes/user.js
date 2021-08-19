const express = require("express");
const multer = require('multer');
const { getDetails } = require("../controllers/user/get_details");
const { removeImage } = require("../controllers/user/remove_image");
const { uploadPicture } = require("../controllers/user/upload_picture");
const { verifyToken } = require("../middlewares/auth_middleware");

const storage = multer.diskStorage({});
const upload = multer({ storage });
const router = express.Router();

router.get('/getdetails', verifyToken, getDetails);
router.post('/remove', verifyToken, removeImage);
router.route('/upload').post(verifyToken, upload.single('photo'), uploadPicture);

module.exports = router;