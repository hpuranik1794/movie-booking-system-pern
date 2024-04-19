import React from 'react'
import Seat from './Seat'

const SeatLegend = () => {
	return (
		<div className="row">
			Available : <Seat seatId="random" status="av" />
			Selected : <Seat seatId="random" status="select" />
			Booked : <Seat seatId="random" status="booked" />
		</div>
	)
}

export default SeatLegend;
