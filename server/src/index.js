const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const LogEntry = require("./models/LogEntry");

require("dotenv").config();

const middlewares = require("./middlewares");
const logs = require("./api/logs");

const app = express();

app.enable("trust proxy"); // needed for rate limiting by Client IP

mongoose.connect(
  process.env.DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (!error) {
      console.log("Weclome to mLab: connected to database");
    }
    console.error("index.js 27 error: >>> ", error);
  }
);

// fill up the collection with sample
// LogEntry.create(
//   {
//     title: "Sexmuseum Amsterdam Venustempel",
//     comments: "Dutch testing ...",
//     latitude: 52.3769882,
//     longitude: 4.8960566,
//     rating: 7,
//     image:
//       "https://www.google.com/imgres?imgurl=http%3A%2F%2Fwww.garagu.com%2Fimg_gal.php%3Ffile%3Darchivo%2Ffoto%2F13%2F06%2F12%2F1371067604_0e2cd8caa6df6a0d20083254d674f09b.jpg%26x%3D469%26y%3D800%26crop%3D0%26aspect%3Dorig&imgrefurl=http%3A%2F%2Fwww.garagu.com%2F%3Fpage%3Ddestino%26buscar-id%3D1536&tbnid=ztCsvLMmGW7JJM&vet=12ahUKEwjTz4jjj5LpAhUG0qwKHR7GB5kQMygUegQIARAX..i&docid=2MxOvVjsZxuohM&w=469&h=312&q=netherlands%20sex%20museum&ved=2ahUKEwjTz4jjj5LpAhUG0qwKHR7GB5kQMygUegQIARAX",
//     visitDate: "2020-04-30T23:40:53.294Z",
//   },
//   (error, data) => {
//     if (error) {
//       console.log("Error occurred", error);
//     }
//     console.log("Data added to collection: ", data);
//   }
// );

app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

app.use("/api/logs", logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
