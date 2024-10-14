require("dotenv").config();
const axios = require("axios");
const { Movie, Seat, sequelize } = require("../sequelize");

const clearMovieTable = async () => {
  try {
    await sequelize.query('TRUNCATE TABLE "movies", "seats" CASCADE;');
    console.log("Successfully cleared movie table");
  } catch (error) {
    console.log("Error while clearing movie table:", error);
  }
}

const addSeatsDesc = (id) => {
  return ({ "id": `${id}`, "status": "available" });
}

const addTheatre = (movie) => {
  movie.availableSeats = 48;
  movie.seats = [];
  var char = 'A';
  for (let i = 0; i < 6; ++i) {
    for (let j = 0; j < 8; ++j) movie.seats.push(addSeatsDesc(char + (j+1)));
    char = String.fromCharCode(char.charCodeAt(0) + 1);
  }
  movie.cost = Math.round(Math.random()*2*100)/100 + 10;
}

const addSeats = async (movieId) => {
  try {
    let row = 'A';
    for (let i = 0; i < 6; ++i) {
      for (let j = 0; j < 8; ++j) {
        await Seat.create({ 
          row: row, 
          col: j+1, 
          status: true, 
          movie_id: movieId
        });
      }
      row = String.fromCharCode(row.charCodeAt(0) + 1);
    }
  } catch (error) {
    console.log(error);
  } 
}

const addMovieToDB = async (movie) => {
  try {
    await Movie.create({ 
      movie_id: movie.id, 
      title: movie.original_title,
      overview: movie.overview,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      rating: movie.vote_count,
      cost: movie.cost,
      availableSeats: movie.availableSeats
    });
  } catch (error) {
    console.log(error.message);
  }
}

const fetchAndUpdateMovies = async () => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}`);
    const movieList = await response.data.results;
    
    await clearMovieTable();

    movieList.forEach(async item => {
      addTheatre(item);
      await addMovieToDB(item);
      await addSeats(item.id);
    });
  } catch (error) {
    console.log(error.message);
  }
  
}

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll({ order: [['movie_id', 'ASC']] });
    res.json(movies);
  } catch (error) {
    console.log(error)
  }
}

const getMovieById = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const movie = await Movie.findOne({ where : { movie_id: movieId } });
    res.json(movie);
  } catch (error) {
    console.log(error.message);
  }
}

const getSeats = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const seats = await Seat.findAll({ 
      where : { movie_id: movieId }, 
      order: [['row', 'ASC'], ['col', 'ASC']] 
    });
    res.json(seats);
  } catch (error) {
    console.log(error.message);
  }
}

const updateSeats = async (seats, movieId) => {
  try {
    seats.forEach(async (seat) => {
      const item = await Seat.findOne({ where : { movie_id: movieId, row: seat.row, col: seat.col } })
      item.status = false;
      await item.save();
    });
  } catch (error) {
    console.log(error.message);
  }
}

const updateMovieById = async (req, res) => {
  const movieId = await req.params.movieId;
  const seats = await req.body.selectedSeats;
  const numSeats = seats.length;
  try {
    updateSeats(seats, movieId);
    const movie = await Movie.findOne({ where : { movie_id: movieId } });
    movie.availableSeats -= numSeats;
    await movie.save();
    console.log("Seats Booked:\n", seats)
    res.json({ message: "Update Successful" });
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { getMovies, getMovieById, getSeats, updateMovieById, fetchAndUpdateMovies }
