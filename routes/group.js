const express = require("express");
const { updateDescription } = require("../controllers/group/update_description");
const { updateGroupProfilePicture } = require("../controllers/group/update_profile_picture");
const { verifyToken } = require("../middlewares/auth_middleware");
const { isUserVerified } = require("../middlewares/user_verified");

const router = express.Router();

router.post("/updateprofile", verifyToken, isUserVerified, updateGroupProfilePicture);
router.post("/updatedescription", verifyToken, isUserVerified, updateDescription);

module.exports = router;