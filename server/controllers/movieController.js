require("dotenv").config();
const axios = require("axios");
const { Movies, Seats } = require("../sequelize");

const addSeatsDesc = (id) => {
  return (
    {
      "id": `${id}`,
      "status": "available"
    } 
  );
}

const addTheatreDesc = (movie) => {
  movie.availableSeats = 48;
  movie.seats = [];
  var char = 'A';
  for (let i = 0; i < 6; ++i) {
    for (let j = 0; j < 8; ++j) {
      movie.seats.push(addSeatsDesc(char + (j+1)));
    }
    char = String.fromCharCode(char.charCodeAt(0) + 1);
  }
  movie.price = 12;
  return movie;
}

const addSeats = async (movie_id) => {
  try {
    let row = 'A';
    for (let i = 0; i < 6; ++i) {
      for (let j = 0; j < 8; ++j) {
        await Seats.create({
          movie_id: movie_id,
          row: row,
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
  // const duplicate = Movie.findOne({ where: { movie_id: movie.id } });
  // if (duplicate) return;
  try {
    // await Movies.create({ 
    //   movie_id: movie.id, 
    //   title: movie.original_title,
    //   overview: movie.overview,
    //   poster_path: movie.poster_path,
    //   backdrop_path: movie.backdrop_path,
    //   rating: movie.popularity,
    //   price: 12,
    //   av_seats: 48
    // });
    await addSeats(movie.id);  // to DB
    const results = await Seats.findAll();
    console.log(results);
  } catch (err) {
    console.error(err);
  }
}

// Movie (local): getData (from API), addMovie (to DB)
// Movie (global): getMovies, getMovie, updateMovie (av_seats)
// Seat (local): addSeats
// Seat (global): getSeats, updateSeat


const getMoviesData = async (req, res) => {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}`)
  const data = await response.data;
  data.results.forEach((movie) => (  // map
    // addTheatreDesc(movie)
    addMovie(movie)  // to DB
  ));
  res.json(data);
}



module.exports = { getMoviesData }
