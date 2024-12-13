const User = require("../model/User");
const Event = require("../model/Events");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uploadOnCloudinary = require("../utils/cloudinary");

const createUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    let avatarPic;

    if (req.file != undefined) {
      avatarPic = await uploadOnCloudinary(req.file.path);
    }
    const ifAlreadyExists = await User.findOne({ email });
    if (ifAlreadyExists) {
      return res.status(411).json({ message: "Email already taken" });
    }

    
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      imageUrl: avatarPic?.secure_url || "undefined",
    });

    return res
      .status(200)
      .json({ message: "User created Successfully", newUser });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "Error wihle creating user" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "No email found" });
    }
    
    const comparedPassword = bcrypt.compareSync(password, user.password);
    if (!comparedPassword) {
      return res.status(401).json({ message: "Incorrect password"});
    }

    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = jwt.sign({ sub: user._id, exp }, process.env.JWT_SECRET);
  
    res.cookie("Authorization", token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ message: "Login successfully", id:user._id, fullName: user.fullName, email: user.email, imageUrl: user.imageUrl});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

const logoutUser = (req, res) => {
  try {
    res.clearCookie("Authorization");
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

const checkAuth = (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

const getUser = async (req, res) => {
  try {
    return res.status(200).json({ user: req.user });
  } catch (error) {
    return res.status(401).json({ message: "Error while finding the user" });
  }
};

const getUserEvents = async (req, res) => {
  try {
    const {_id} = req.user;
    const events = await Event.find({ userId: _id});

    // Filter events based on whether their dates are in the past or in the future
    const currentDate = new Date();
    const pastEvents = events.filter(event => new Date(event.date) < currentDate);
    const upcomingEvents = events.filter(event => new Date(event.date) >= currentDate);

    res.json({ pastEvents, upcomingEvents });
  } catch (error) {
    console.error("Error fetching user's events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUser = async () => {};

const updateAvatar = async () => {};
module.exports = {
  createUser,
  loginUser,
  logoutUser,
  checkAuth,
  getUser,
  updateAvatar,
  updateUser,
  getUserEvents
};
