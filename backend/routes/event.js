const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, eventController.allEvents);
router.post("/create-event", eventController.craeteEvent);
router.put("/update-event/:id", eventController.updateEvent);
router.delete("/delete-event/:id", eventController.deleteEvent);

module.exports = router;
