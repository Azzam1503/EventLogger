const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

router.post("/register", upload.single("avatar"), userController.createUser);
router.post("/sign-in", userController.loginUser);
router.post("/logout", userController.logoutUser);
router.get("/check-auth", authMiddleware, userController.checkAuth);
router.get("/profile", authMiddleware, userController.getUser);
router.get("/profile-update", authMiddleware, userController.updateUser);
router.get(
  "/profile-avatar-update",
  authMiddleware,
  userController.updateAvatar
);
router.get("/events", authMiddleware, userController.getUserEvents);

module.exports = router;
