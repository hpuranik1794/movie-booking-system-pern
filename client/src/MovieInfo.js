import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Theatre from './Theatre';
import PriceCalculator from './PriceCalculator';
import { useContext, useState } from 'react';
import { MovieContext } from './context/MovieContext';
import SeatLegend from './SeatLegend';
import { Button } from '@mui/material';
import { axiosPrivate } from './api/axios';
import useData from './hooks/useData';

function MovieInfo() {
  // const { movies, setMovies } = useContext(MovieContext);
  
  // const movie = movies.find(movie => (movie.id).toString() === movieId);
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  useEffect(() => {
    let ignore = false;
    // const controller = new AbortController();
    const getData = async () => {
      try {
        const response = await axiosPrivate.get(`/movies/${movieId}`, {
          headers: {
            'authorization': `Bearer ${localStorage.getItem("accessToken")}`
          }
        });
        console.log(response.data);
        // isMounted && setMovies(response);
        !ignore && setMovie(response.data);
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
      {/* <Theatre movie={movie} />
      <PriceCalculator movie={movie} /> */}
      <Button>Submit</Button>
    </main>
      
  )
}

export default MovieInfo
