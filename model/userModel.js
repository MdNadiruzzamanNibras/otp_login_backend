const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: "string",
  },
  password: {
    type: "string",
  },
  otp: {
    type: "number",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60, // delete after second
  },
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
