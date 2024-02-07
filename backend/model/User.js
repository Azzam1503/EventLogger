const mongosee = require("mongoose");

const userSchema = new mongosee.Schema(
  {
    name: {
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
  },
  {
    timestamps: true,
  }
);

const User = mongosee.model("user", userSchema);
module.exports = User;
