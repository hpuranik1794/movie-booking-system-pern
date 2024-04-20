require("dotenv").config();
const axios = require("axios");
const { Movie, Seat } = require("../sequelize");

// const addSeatsDesc = (id) => {
//   return (
//     {
//       "id": `${id}`,
//       "status": "available"
//     } 
//   );
// }

// const addTheatreDesc = (movie) => {
//   movie.availableSeats = 48;
//   movie.seats = [];
//   var char = 'A';
//   for (let i = 0; i < 6; ++i) {
//     for (let j = 0; j < 8; ++j) {
//       movie.seats.push(addSeatsDesc(char + (j+1)));
//     }
//     char = String.fromCharCode(char.charCodeAt(0) + 1);
//   }
//   movie.price = 12;
//   return movie;
// }

// const addSeats = async (movie_id) => {
//   try {
//     let row = 'A';
//     for (let i = 0; i < 6; ++i) {
//       for (let j = 0; j < 8; ++j) {
//         await Seat.create({
//           movie_id: movie_id,
//           row: row,
//           status: true
//         })
//       }
//       row = String.fromCharCode(row.charCodeAt(0) + 1)
//     }
//   } catch (err) {
//     console.error(err);
//   }
  
// }

// const addMovie = async (movie) => {
//   const duplicate = Movie.findOne({ where: { movie_id: movie.id } });
//   if (duplicate) return;
//   try {
//     await Movie.create({ 
//       movie_id: movie.id, 
//       title: movie.original_title,
//       overview: movie.overview,
//       poster_path: movie.poster_path,
//       backdrop_path: movie.backdrop_path,
//       rating: movie.popularity,
//       price: 12,
//       av_seats: 48
//     });
//     await addSeats(movie.id);  // to DB
//     const results = await Seats.findAll();
//     console.log(results);
//   } catch (err) {
//     console.error(err);
//   }
// }

// // Movie (local): getData (from API), addMovie (to DB)
// // Movie (global): getMovies, getMovie, updateMovie (av_seats)
// // Seat (local): addSeats
// // Seat (global): getSeats, updateSeat


// const getMoviesData = async (req, res) => {
//   const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}`)
//   const data = await response.data;
//   data.results.forEach((movie) => (  // map
//     // addTheatreDesc(movie)
//     addMovie(movie)  // to DB
//   ));
//   res.json(data);
// }

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll({
      order: [
        ['id', 'ASC']
      ]
    });
    res.json(movies);
  } catch (err) {
    console.error(err.message);
  }
}

const getMovieById = async (req, res) => {
  const movieId = req.params.movieId;
  const movie = await Movie.findOne({ where : { movie_id: movieId } });
  res.json(movie);
}

const getSeats = async (req, res) => {
  const movieId = req.params.movieId;
  const seats = await Seat.findAll({ 
    where : { 
      movie_id: movieId 
    }, 
    order: [
      ['row', 'ASC'],
      ['col', 'ASC']
    ]});
  res.json(seats);
}

const updateSeats = async (seats, movieId) => {
  try {
    seats.forEach((seat) => (
      (async () => {
        const row = seat[0];
        const col = seat[1];
        const s = await Seat.findOne({ where : { movie_id: movieId, row: row, col: col } })
        s.status = false;
        await s.save();
      })()
    ));
  } catch (err) {
    console.error(err.message);
  }
}

const updateMovieById = async (req, res) => {
  const movieId = req.params.movieId;
  const seats = req.body.ss;
  const numSeats = seats.length;
  try {
    updateSeats(seats, movieId);
    const movie = await Movie.findOne({ where : { movie_id: movieId } });
    movie.av_seats -= numSeats;
    await movie.save();
    res.json({ message: "Update Successful" })
  } catch (err) {
    console.error(err.message);
  }
  
}


module.exports = { getMovies, getMovieById, getSeats, updateMovieById }
