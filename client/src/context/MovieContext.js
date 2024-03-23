import { createContext } from "react";
import axios from 'axios';
import { useState, useEffect } from 'react';

export const MovieContext = createContext({});

const MovieProvider = ({ children }) => {
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
    <MovieContext.Provider value={{
      movies, setMovies, search, setSearch
    }}>
      {children}
    </MovieContext.Provider>
  )
}

export default MovieProvider;
