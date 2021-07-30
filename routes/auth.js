const express = require("express");
const router = express.Router();
const { googleSignin } = require("../controllers/auth/google_signin");
const { googleSignup } = require("../controllers/auth/google_signup");
const { register } = require("../controllers/auth/register");
const { setPassword } = require("../controllers/auth/set_password");
const { signIn } = require("../controllers/auth/signin");
const { signUp } = require("../controllers/auth/signup");
const { verifyUser } = require("../controllers/auth/verify_user");
const { verifyToken } = require("../middlewares/auth_middleware");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/register", register);
router.post("/googlesignin", googleSignin);
router.post("/googlesignup", googleSignup);
router.post('/setpassword', verifyToken, setPassword);
router.get("/verify/:userToken", verifyUser);

module.exports = router;