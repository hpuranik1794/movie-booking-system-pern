import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Theatre from './Theatre';
import PriceCalculator from './PriceCalculator';
import { useContext, useState } from 'react';
import { MovieContext } from './context/MovieContext';
import SeatLegend from './SeatLegend';
import { Button } from '@mui/material';
import { axiosPrivate } from './api/axios';
import useAxiosPrivate from './hooks/useAxiosPrivate';

function MovieInfo() {
  // const { movies, setMovies } = useContext(MovieContext);
  
  // const movie = movies.find(movie => (movie.id).toString() === movieId);
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [seats, setSeats] = useState([]);
  const axiosPrivate1 = useAxiosPrivate();
  useEffect(() => {
    let ignore = false;
    // const controller = new AbortController();
    const getData = async () => {
      try {
        const promise1 = axiosPrivate1.get(`/movies/${movieId}`);
        const promise2 = axiosPrivate1.get(`/movies/seats/${movieId}`);
        const [movieInfo, seats] = await Promise.all([promise1, promise2]);
        console.log(movieInfo.data);
        console.log(seats.data);
        // isMounted && setMovies(response);
        !ignore && setMovie(movieInfo.data);
        !ignore && setSeats(seats.data);
      } catch (err) {
        console.error(err);
      }
    }
    getData();
    return () => {
      ignore = true;
    }
  }, []);
  console.log(movie);
  
  return (
    <main>
      <article>
        {movie && 
        <>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <img src={`https://image.tmdb.org/t/p/w200${movie.backdrop_path}`} alt="" />
        </>}
      </article>
      <SeatLegend />
      <Theatre seats={seats} />
      
    </main>
      
  )
}

export default MovieInfo
