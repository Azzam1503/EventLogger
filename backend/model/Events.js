const mongosee = require("mongoose");

const eventsSchema = new mongosee.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    userId: {
      type: mongosee.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // dateTime: {
    //   type: String,
    //   required: true,
    // },
    // speakers: {
    //   type: String,
    // },
    // guests: []
  },
  {
    timestamps: true,
  }
);

const Event = mongosee.model("event", eventsSchema);
module.exports = Event;
