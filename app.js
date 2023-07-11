const express = require("express");
const app = express();
require("dotenv/config");
const cors = require("cors");
const { default: mongoose } = require("mongoose");

var whitelist = ['http://localhost:3000']

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors({ origin: 'http://localhost:3000' }))
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
const userRoute = require("./routes/auth");

app.options('*', cors())


app.use("/api/users/",  userRoute);

// Artist links
const artistsRoute = require("./routes/artists");
app.use("/api/artists/",  artistsRoute);

// Album links
const albumRoute = require("./routes/albums");
app.use("/api/albums/",  albumRoute);

// Songs links
const songRoute = require("./routes/songs");
app.use("/api/songs/",  songRoute);

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
