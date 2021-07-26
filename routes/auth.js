const express = require("express");
const router = express.Router();
const { googleSignin } = require("../controllers/auth/google_signin");
const { googleSignup } = require("../controllers/auth/google_signup");
const { register } = require("../controllers/auth/register");
const { signIn } = require("../controllers/auth/signin");
const { signUp } = require("../controllers/auth/signup");
const { verifyUser } = require("../controllers/auth/verify_user");
const { userIdParam } = require("../middlewares/user_middleware");

router.param("userToken", userIdParam);

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/register", register);
router.post("/googlesignin", googleSignin);
router.post("/googlesignup", googleSignup);
router.get("/verify/:userToken", verifyUser);

module.exports = router;