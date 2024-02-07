const mongoose = require("mongosee");

const connectToDb = async () => {
  try {
    await mongoose.connect(porcess.env.MONGO_URI);
    console.log("MonogoDB connected");
  } catch (error) {
    console.log(error);
  }
};
