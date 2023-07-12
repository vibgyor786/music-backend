const artistsRoute = require("./routes/person_song");
const userRoute = require("./routes/secure");
const albumRoute = require("./routes/group_song");
const songRoute = require("./routes/listenauth");
const express = require("express");
const app = express();
require("dotenv/config");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const router = require("./routes/person_song");

var whitelist = ["http://localhost:3000"];

var corsOptions = {
  origin: 'http://localhost:3000',
  // origin: "https://music-frontend-phi.vercel.app",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors({ origin: "https://music-frontend-phi.vercel.app" }));
// app.use((req, res, next) => {
//   // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   // res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT,DELETE");
//   // res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   res.setHeader("HTTP/1.1 200 OK")
//   next();
// })
// let corsOptions = {
//   // origin: "https://code2clone.ieeessitvit.tech",
//   origin: "http://localhost:3000",
//   credentials: true,

//   methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
// };
// app.use(cors(corsOptions));

// user authentication routes
app.options("*", cors());
app.get("/", (req, res) => {
  res.send("Working");
});

app.use("/api/users/", userRoute);
app.use("/api/artists/", artistsRoute);
app.use("/api/albums/", albumRoute);
app.use("/api/songs/", songRoute);





mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });
mongoose.connection
  .once("open", () => console.log("Connected"))
  .on("error", (error) => {
    console.log(`Error : ${error}`);
  });

app.listen(4000, () => console.log("lisitening to port 4000"));
