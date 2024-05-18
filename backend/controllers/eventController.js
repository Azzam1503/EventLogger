const Event = require("../model/Events");
const uploadOnCloudinary = require("../utils/cloudinary");

const allEvents = async (req, res) => {
  try {
    const events = await Event.find({}).select("-imageUrl -speakers -description");
    return res
      .status(200)
      .json({ message: "Events fetched Successfully", events });
  } catch (error) {
    return res.status(501).json({ message: "Error while finding events" });
  }
};

const craeteEvent = async (req, res) => {
  try {
    const { title, description, venue, speakers, date, time, department } = req.body;
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
      speakers,
      department
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
    const { title, description, venue, speakers, date, time } = req.body;
    let updatedImage;
    if(req.file != undefined){
      updatedImage = await uploadOnCloudinary(req.file.path);
      console.log(updatedImage);
    }

    const { id } = req.params;
    const check = await Event.findById(id);

    // Check if the user making the request is the creator of the event
    if (check.userId !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to update this event" });
    }

    await Event.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        venue,
        date,
        time,
        speakers,
        imageUrl: updatedImage?.secure_url
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

const homepageEvents = async (req, res) => {
  try {
    const today = new Date();

    const upcomingEvents = await Event.find({ date: { $gte: today.toISOString() } })
      .sort({ date: 1 })
      .limit(10);
    
    const pastEvents = await Event.find({ date: { $lt: today.toISOString() } })
      .sort({ date: -1 })
      .limit(10);
    
    console.log("past", pastEvents);
    console.log("upcoming", upcomingEvents);
    
    res.json({ upcomingEvents, pastEvents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  allEvents,
  craeteEvent,
  updateEvent,
  deleteEvent,
  getEvent,
  homepageEvents
};
