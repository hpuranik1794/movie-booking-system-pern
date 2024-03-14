import React from 'react';

const PriceCalculator = ({ movie }) => {
	return (
		<div>
			<p>{48 - movie?.availableSeats} seats selected</p>
			<p>Price: ${(48 - movie?.availableSeats) * (movie?.price)}</p>
		</div>
	)
}

export default PriceCalculator;
