require("dotenv").config()
const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const axios = require("axios");
const { Movie, Seat } = require("./sequelize");
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

const addSeats = async (movie_id) => {
  try {
    let row = 'A';
    for (let i = 0; i < 6; ++i) {
      for (let j = 0; j < 8; ++j) {
        await Seat.create({
          movie_id: movie_id,
          row: row,
          col: j+1,
          status: true
        })
      }
      row = String.fromCharCode(row.charCodeAt(0) + 1)
    }
  } catch (err) {
    console.error(err);
  }
  
}

const addMovie = async (movie) => {
  const duplicate = Movie.findOne({ where: { movie_id: movie.id } });
  if (duplicate) return;
  try {
    await Movie.create({ 
      movie_id: movie.id, 
      title: movie.original_title,
      overview: movie.overview,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      rating: movie.popularity,
      price: 12,
      av_seats: 48
    });
    await addSeats(movie.id);  // to DB
    const results = await Seat.findAll();
    console.log(results);
  } catch (err) {
    console.error(err);
  }
}

const getMoviesData = async () => {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}`)
  const data = await response.data;
  data.results.forEach((movie) => (  // map
    // addTheatreDesc(movie)
    addMovie(movie)  // to DB
  ));
  console.log(data.results);
}

cron.schedule("*/5 * * * *", () => {
  console.log("Fetching data from API and updating DB");
  getMoviesData();
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

