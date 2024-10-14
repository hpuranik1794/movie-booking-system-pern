import React from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MovieContext } from './context/MovieContext';

const PriceCalculator = () => {
	const { movies } = useContext(MovieContext);
  const { movieId } = useParams();
  const movie = movies.find(movie => (movie.id).toString() === movieId);
	console.log(movie);
	return (
		<div>
			<p>{48 - movie?.availableSeats} seats selected</p>
			<p>Price: ${(48 - movie?.availableSeats) * (movie?.price)}</p>
		</div>
	)
}

export default PriceCalculator;
