const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MonogoDB connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDb;
