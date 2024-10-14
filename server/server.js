require("dotenv").config()
const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const axios = require("axios");
const { Movie, Seat } = require("./sequelize");
const auth = require("./routes/auth");
const refresh = require("./routes/refresh");
const movies = require("./routes/movies");
const verifyJWT = require("./middleware/verifyJWT");
const { fetchAndUpdateMovies } = require("./controllers/movieController");

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Credentials', true);
  }
  next();
}

const allowedOrigins = [
  'http://localhost:3000'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
}

const app = express();

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/auth", refresh);

// app.use(verifyJWT);
app.use("/api/movies", movies);

cron.schedule("*/30 * * * *", async () => {
  console.log("Fetching data from API and updating DB");
  await fetchAndUpdateMovies();
  console.log("Done!");
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

