import React from 'react'
import Seat from './Seat'

const SeatLegend = () => {
	return (
		<div className="row">
			Available : <Seat seatId="random" seatStatus="available" />
			Selected : <Seat seatId="random" seatStatus="selected" />
			Booked : <Seat seatId="random" seatStatus="booked" />
		</div>
	)
}

export default SeatLegend;
