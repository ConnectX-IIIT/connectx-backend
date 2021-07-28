const express = require("express");
const { getDetails } = require("../controllers/user/get_details");
const { uploadBackgroundImage } = require("../controllers/user/upload_background_picture");
const { uploadProfilePicture } = require("../controllers/user/upload_profile_picture");
const { verifyToken } = require("../middlewares/auth_middleware");
const { uploadBackground } = require("../middlewares/upload_user_background_picture");
const { uploadProfile } = require("../middlewares/upload_user_profile_picture");

const router = express.Router();

router.get('/getdetails', verifyToken, getDetails);
router.route('/uploadprofile').post(verifyToken, uploadProfile.single('photo'), uploadProfilePicture);
router.route('/uploadbackground').post(verifyToken, uploadBackground.single('coverPhoto'), uploadBackgroundImage);

module.exports = router;