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
    date: {
      type: String,
    },
    time:{
      type: String
    },
    speakers: [{
      name: {
        type: String
      },
      about:{
        type: String
      }
    }],
    showOnHomagePage:{
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

const Event = mongosee.model("event", eventsSchema);
module.exports = Event;
