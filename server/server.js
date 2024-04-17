require("dotenv").config()
const express = require("express");
const cors = require("cors");
const auth = require("./routes/authJWT");
const movies = require("./routes/movies");
const verifyJWT = require("./middleware/verifyJWT");

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

app.use("/auth", auth);

app.use(verifyJWT);
app.use("/movies", movies);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

