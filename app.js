const express = require("express");
const app = express();
require("dotenv/config");
const cors = require("cors");
const { default: mongoose } = require("mongoose");

var whitelist = ['http://localhost:3000']

var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
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
app.use("/api/users/", cors(corsOptionsDelegate), userRoute);

// Artist links
const artistsRoute = require("./routes/artists");
app.use("/api/artists/", cors(corsOptionsDelegate), artistsRoute);

// Album links
const albumRoute = require("./routes/albums");
app.use("/api/albums/", cors(corsOptionsDelegate), albumRoute);

// Songs links
const songRoute = require("./routes/songs");
app.use("/api/songs/", cors(corsOptionsDelegate), songRoute);

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
