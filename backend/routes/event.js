const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

router.get("/allEvents", eventController.allEvents);
router.post(
  "/create-event",
  upload.single("event-pic"),
  authMiddleware,
  eventController.craeteEvent
);
router.get("/get-event/:id", eventController.getEvent);
router.put("/update-event/:id", upload.single("imageUrl"), authMiddleware, eventController.updateEvent);
router.delete("/delete-event/:id", eventController.deleteEvent);
router.get("/homepage-events", eventController.homepageEvents);
router.get("/downloadEvents", eventController.downloadEvents);

module.exports = router;
