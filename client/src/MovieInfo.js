import React from 'react'
import { useParams } from 'react-router-dom';
import Theatre from './Theatre';
import PriceCalculator from './PriceCalculator';
import { useContext } from 'react';
import { MovieContext } from './context/MovieContext';
import SeatLegend from './SeatLegend';
import { Button } from '@mui/material';

function MovieInfo() {
  const { movies, setMovies } = useContext(MovieContext);
  const { movieId } = useParams();
  const movie = movies.find(movie => (movie.id).toString() === movieId);
  return (
    <main>
      <article>
        {movie && 
        <>
          <h2>{movie.original_title}</h2>
          <p>{movie.overview}</p>
          <img src={`https://image.tmdb.org/t/p/w200${movie.backdrop_path}`} alt="" />
        </>}
      </article>
      <SeatLegend />
      <Theatre movie={movie} />
      <PriceCalculator movie={movie} />
      <Button>Submit</Button>
    </main>
      
  )
}

export default MovieInfo
