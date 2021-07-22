const express = require("express");
const { signIn } = require("../controllers/auth/signin");
const { register } = require("../controllers/auth/signup");
const { verifyUser } = require("../controllers/auth/verify_user");
const router = express.Router();
const { userIdParam } = require("../middlewares/user_middleware");

router.param("userToken", userIdParam);

router.post("/register", register);
router.post("/signin", signIn);
router.get("/verify/:userToken", verifyUser);

module.exports = router;