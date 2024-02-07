const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

router.get("/", eventController.allEvents);
router.post("/create-event", eventController.craeteEvent);
router.put("/update-event/:id", eventController.craeteEvent);
router.delete("/delete-event/:id", eventController.deleteEvent);

module.exports = router;
