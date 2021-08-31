const express = require("express");
const multer = require('multer');
const { updateDescription } = require("../controllers/group/update_description");
const { updateGroupProfilePicture } = require("../controllers/group/update_profile_picture");
const { verifyToken } = require("../middlewares/auth_middleware");
const { isUserVerified } = require("../middlewares/user_verified");

const storage = multer.diskStorage({});
const upload = multer({ storage });
const router = express.Router();

router.post("/updateprofile", verifyToken, isUserVerified, upload.single('photo'), updateGroupProfilePicture);
router.post("/updatedescription", verifyToken, isUserVerified, updateDescription);

module.exports = router;