const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");

const {
  handleSignUp,
  handleSignin,
  handleSendOtp,
  handleSubmitOtp,
  handleGetUser,
} = require("../controller/user");

router.post("/signup", handleSignUp);
router.post("/signin", handleSignin);
router.post("/sendOtp", handleSendOtp);
router.post("/submitOtp", handleSubmitOtp);
router.post("/getUser", authMiddleware, handleGetUser);

module.exports = router;
