const express = require("express");
const router = express.Router();
const { googleLogin } = require("../controllers/auth/google_login");
const { register } = require("../controllers/auth/register");
const { signIn } = require("../controllers/auth/signin");
const { signUp } = require("../controllers/auth/signup");
const { verifyUser } = require("../controllers/auth/verify_user");
const { userIdParam } = require("../middlewares/user_middleware");

router.param("userToken", userIdParam);

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/register", register);
router.post("/googlelogin", googleLogin);
router.get("/verify/:userToken", verifyUser);

module.exports = router;