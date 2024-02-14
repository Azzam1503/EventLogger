const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

router.get("/", authMiddleware, eventController.allEvents);
router.post(
  "/create-event",
  upload.single("event-pic"),
  eventController.craeteEvent
);
router.put("/update-event/:id", eventController.updateEvent);
router.delete("/delete-event/:id", eventController.deleteEvent);

module.exports = router;
