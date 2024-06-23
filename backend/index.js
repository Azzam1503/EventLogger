require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDb = require("./config/connectToDb");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: '*',
    methods: '*',
    credentials: true,
  })
);
connectToDb();
app.use("/user", require("./routes/user"));
app.use("/event", require("./routes/event"));
app.get("/", (req, res) => {
  res.send("Hello");
});
app.listen(PORT, () => {
  console.log("Server is runnig on 3000");
});
