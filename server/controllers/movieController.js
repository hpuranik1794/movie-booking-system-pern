const axios = require("axios");

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


const getMoviesData = async (req, res) => {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=b3e1f16fd88cb42388742991cc39ce7e`)
  const data = await response.data;
  data.results.map((movie) => (
    addTheatreDesc(movie)
  ));
  res.json(data);
}

module.exports = { getMoviesData }
