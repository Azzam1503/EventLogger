const jwt = require("jsonwebtoken");
const User = require("../model/User");
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.Authorization;
    console.log("called");
    console.log(req.cookies.Authorization);
    if (!token) {
      return res.status(401).json({ msg: "No token found" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.exp < Date.now()) {
      return res.json(401).json({ message: "Session Expired! Login again" });
    }

    const user = await User.findOne({ _id: decoded.sub }).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Invalid user" });
    }
    console.log("called");
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = authMiddleware;
