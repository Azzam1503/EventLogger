const User = require("../model/User");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const ifAlreadyExists = await User.findOne({ email });
    if (ifAlreadyExists) {
      return res.status(411).json({ message: "Email already taken" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res
      .status(200)
      .json({ message: "User created Successfully", newUser });
  } catch (error) {
    return res.status(501).json({ message: "Error wihle creating user" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
};

module.exports = {
  createUser,
};
