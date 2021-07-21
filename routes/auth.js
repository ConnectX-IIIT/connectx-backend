const express = require("express");
const router = express.Router();
const { register, verifyUser, signIn } = require("../controllers/auth");
const { userIdParam } = require("../middlewares/user_middleware");

router.param("userToken", userIdParam);

router.post("/register", register);
router.post("/signin", signIn);
router.get("/verify/:userToken", verifyUser);

module.exports = router;