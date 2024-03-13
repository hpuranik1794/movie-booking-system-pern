import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Shows from './Shows.js'
import MovieInfo from './MovieInfo.js';
import { Routes, Route } from 'react-router-dom';


const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  
  const addSeatsDesc = (id) => {
    return (
      {
        "id": `${id}`,
        "status": "available"
      }
    );
  }

  const addTheatreDesc = (movie) => {
    movie.totalSeats = 48;
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

  useEffect (() => {
    const getData = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=b3e1f16fd88cb42388742991cc39ce7e`)
        const data = await response.data;
        data.results.map((movie) => (
          addTheatreDesc(movie)
        ));
        setMovies(data.results);
      } catch (err) {
        console.log(err);
      }
    }
   getData();
  }, []);

 

  return (
    <Routes  path="/">
      <Route index element={<Shows movies={movies} setMovies={setMovies} search={search} setSearch={setSearch}/>} />
      <Route path="/:movieId" exact element={<MovieInfo movies={movies} setMovies={setMovies}/>} />
    </Routes>
    
  )
}

export default App;
