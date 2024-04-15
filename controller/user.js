const { hash, compareSync } = require("bcrypt");
const User = require("../model/userModel");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const handleSignUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const olduser = await User.findOne({ email: email }).exec();
    if (olduser) {
      res.send({ code: 500, message: "user already exits" });
    }
    const hashedPassword = await hash(password, 12);
    const newUser = new User({ email: email, password: hashedPassword });

    await newUser.save();
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.send({ code: 200, message: "user create", token: token });
  } catch (error) {
    console.log(error);
  }
};

// Sign IN

const handleSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).exec();
    if (!user) {
      return res.status(500).json({ message: "User not found" });
    } else if (!compareSync(password, user.password)) {
      return res.status(404).json({ message: "Incorrect Password" });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    return res
      .status(200)
      .json({ message: "User found", token: token, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const handleSendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const _otp = Math.floor(100000 + Math.random() * 900000); // Corrected typo
    const user = await User.findOne({ email: email }).select("-password");
    console.log(user, _otp); // Corrected variable name
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    // email otp send
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      sendMail: true,
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: "eldon.terry@ethereal.email",
        pass: "Jp93SAhUWZx9EaUky9",
      },
    });
    const info = await transporter.sendMail({
      from: '"Nibras 👻" <eldon.terry@ethereal.email>',
      to: email,
      subject: "OTP Send",
      text: String(_otp),
      html: "<b>Hello world?</b>",
    });

    if (info.messageId) {
      console.log(info, "info,73");
      const updateUser = await User.updateOne({ email: email }, { otp: _otp });
      console.log(updateUser, "updateuser");
      res.status(200).send({ otp: _otp, message: "otp send", updateUser });
    } else {
      res.status(401).send({ message: "error otp" });
    }
  } catch (error) {
    return res.status(500).json({ message: "User not found" });
  }
};

const handleSubmitOtp = async (req, res) => {
  try {
    const { otp, password } = req.body;
    const userfound = await User.findOne({ otp: otp });
    if (!userfound) {
      res.status(401).send({ message: "otp is worng" });
    }
    console.log(userfound);
    const hashedPassword = await hash(password, 12);
    console.log(hashedPassword, "hakddlk");
    const updateUser = await User.updateOne(
      { email: userfound.email },
      { password: hashedPassword }
    );
    res.status(200).send({ message: "otp found", updateUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// get user

const handleGetUser = async (req, res) => {
  try {
    const { email } = req.decoded;
    const user = await User.findOne({ email: email });
    res.send(user);
  } catch (err) {
    next(err);
    res.send({ message: "user not logged yet" });
  }
};
module.exports = {
  handleSignUp,
  handleSignin,
  handleSendOtp,
  handleSubmitOtp,
  handleGetUser,
};
