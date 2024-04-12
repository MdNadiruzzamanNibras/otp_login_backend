const express = require("express");
const router = express.Router();
const { handleSignUp, handleSignin } = require("../controller/user");

router.post("/signup", handleSignUp);
router.post("/signin", handleSignin);

module.exports = router;
