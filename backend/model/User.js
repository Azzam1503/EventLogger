const mongosee = require("mongoose");
const Events = require("./Events");

const userSchema = new mongosee.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    events: [
      {
        type: mongosee.Schema.Types.ObjectId,
        ref: "Events",
    }
    ],
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

const User = mongosee.model("user", userSchema);
module.exports = User;
