const express = require("express");
const { forgotPassword } = require("../controllers/auth/forgot_password");
const router = express.Router();
const { googleSignin } = require("../controllers/auth/google_signin");
const { googleSignup } = require("../controllers/auth/google_signup");
const { addExtraDetails } = require("../controllers/auth/add_extra_details");
const { resetPassword } = require("../controllers/auth/reset_password");
const { setPassword } = require("../controllers/auth/set_password");
const { signIn } = require("../controllers/auth/signin");
const { signUp } = require("../controllers/auth/signup");
const { verifyUser } = require("../controllers/auth/verify_user");
const { verifyToken } = require("../middlewares/auth_middleware");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/addextradetails", addExtraDetails);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword", resetPassword);
router.post("/googlesignin", googleSignin);
router.post("/googlesignup", googleSignup);
router.post('/setpassword', verifyToken, setPassword);
router.get("/verify/:userToken", verifyUser);

module.exports = router;