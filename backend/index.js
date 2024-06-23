require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDb = require("./config/connectToDb");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
connectToDb();
app.use("/user", require("./routes/user"));
app.use("/event", require("./routes/event"));
app.get("/", (req, res) => {
  res.send("Hello");
});
app.listen(3000, () => {
  console.log("Server is runnig on 3000");
});
