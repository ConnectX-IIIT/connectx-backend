const express = require("express");
const multer = require('multer');
const { getDetails } = require("../controllers/user/get_details");
const { removeImage } = require("../controllers/user/remove_image");
const { updateDetails } = require("../controllers/user/update_details");
const { uploadPicture } = require("../controllers/user/upload_picture");
const { verifyToken } = require("../middlewares/auth_middleware");
const { isUserVerified } = require("../middlewares/user_verified");

const storage = multer.diskStorage({});
const upload = multer({ storage });
const router = express.Router();

router.get('/getdetails', verifyToken, getDetails);
router.get('/getdetails/:userId', verifyToken, isUserVerified, getDetails);
router.post('/removephoto', verifyToken, removeImage);
router.post('/updatedetails', verifyToken, updateDetails);
router.route('/upload').post(verifyToken, upload.single('photo'), uploadPicture);

module.exports = router;