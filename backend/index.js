require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDb = require("./config/connectToDb");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
let allowedOrigin = "http://localhost:5173";
if(process.env.NODE_ENV === "production") allowedOrigin = 'https://event-logger-five.vercel.app';

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);
connectToDb();

app.get("/", (req, res) =>{
  res.send("Hello there!");
})
app.use("/user", require("./routes/user"));
app.use("/event", require("./routes/event"));
app.get("/", (req, res) => {
  res.send("Hello");
});
app.listen(PORT, () => {
  console.log("Server is runnig on 3000");
});
