const { hash, compareSync } = require("bcrypt");
const User = require("../model/userModel");

const handleSignUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const olduser = await User.findOne({ email: email }).exec();
    if (olduser) {
      res.send({ code: 500, message: "user already exits" });
    }
    const hashedPassword = await hash(password, 12);
    const newUser = new User({ email: email, password: hashedPassword });

    await newUser.save();
    res.send({ code: 200, message: "user create" });
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
    return res.status(200).json({ message: "User found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { handleSignUp, handleSignin };
