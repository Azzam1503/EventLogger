const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/sign-up", userController.createUser);
router.post("/sign-in", userController.loginUser);
router.post("/logout", userController.logoutUser);
router.get("/check-auth", authMiddleware, userController.checkAuth);

module.exports = router;
