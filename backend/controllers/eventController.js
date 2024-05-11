const Event = require("../model/Events");
const uploadOnCloudinary = require("../utils/cloudinary");

const allEvents = async (req, res) => {
  try {
    const events = await Event.find({});

    return res
      .status(200)
      .json({ message: "Events fetched Successfully", events });
  } catch (error) {
    return res.status(501).json({ message: "Error while finding events" });
  }
};

const craeteEvent = async (req, res) => {
  try {
    const { title, description, venue, speakers, date, time } = req.body;
    console.log(req.body.speakers);
    let eventImage;
    if (req.file != undefined) {
      eventImage = await uploadOnCloudinary(req.file.path);
    }
    const newEvent = await Event.create({
      title,
      description,
      venue,
      imageUrl: eventImage?.secure_url || "undefined",
      date,
      time,
      userId: req.user._id,
      speakers
    });

    return res
      .status(200)
      .json({ message: "event created Successfully", newEvent });
  } catch (error) {
    console.log("error while creating event",error)
    return res.status(501).json({ message: "Error while creating the event" });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { title, description, venue } = req.body;
    const { id } = req.params;

    await Event.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        venue,
      }
    );

    const event = await Event.findById(id);

    return res
      .status(200)
      .json({ message: "Event update Successfully", event });
  } catch (error) {
    return res.json(411).json({ message: "Error while updating event" });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ message: "Event deleted Successfully", event });
  } catch (error) {
    return res.json(411).json({ message: "Error while deleting event" });
  }
};

 const getEvent = async (req, res) => {
  try {
    const {id} = req.params;

    const event = await Event.findById(id);

    return res.status(200).json({message: "Event found successfully", event})
  } catch (error) {
    return res.json(411).json({ message: "Error while finding event" });
  }
}

module.exports = {
  allEvents,
  craeteEvent,
  updateEvent,
  deleteEvent,
  getEvent
};
