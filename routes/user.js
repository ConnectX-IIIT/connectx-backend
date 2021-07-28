const express = require("express");
const multer = require('multer');
const { getDetails } = require("../controllers/user/get_details");
const { getImage } = require("../controllers/user/get_image");
const { uploadBackgroundImage } = require("../controllers/user/upload_background_picture");
const { uploadProfilePicture } = require("../controllers/user/upload_profile_picture");
const { verifyToken } = require("../middlewares/auth_middleware");

const upload = multer({ dest: 'assets' });
const router = express.Router();

router.get('/getdetails', verifyToken, getDetails);
router.get('/images/:key', getImage);
router.route('/uploadprofile').post(verifyToken, upload.single('photo'), uploadProfilePicture);
router.route('/uploadbackground').post(verifyToken, upload.single('coverPhoto'), uploadBackgroundImage);

module.exports = router;