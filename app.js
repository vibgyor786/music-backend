const express = require("express");
const app = express();
require("dotenv/config");
const cors = require("cors");
const { default: mongoose } = require("mongoose");

let corsOptions = {
  // origin: "https://code2clone.ieeessitvit.tech",
  origin:"http://localhost:3000",
  credentials: true,

  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
};


app.options('*', cors())

app.use(express.json());
app.use(function(req, res, next) { //allow cross origin requests
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
// user authentication routes
const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

// Artist links
const artistsRoute = require("./routes/artists");
app.use("/api/artists/", artistsRoute);

// Album links
const albumRoute = require("./routes/albums");
app.use("/api/albums/", albumRoute);

// Songs links
const songRoute = require("./routes/songs");
app.use("/api/songs/", songRoute);

// If any depreciation warning add depreciation options
// mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true }, () => {
//   console.log("Mongodb Connected");
// });

mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });
mongoose.connection
  .once("open", () => console.log("Connected"))
  .on("error", (error) => {
    console.log(`Error : ${error}`);
  });

app.listen(4000, () => console.log("lisitening to port 4000"));
