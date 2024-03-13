import React from 'react'
import './seat.css'

const Seat = ({ seatId, seatStatus }) => {
  const handleSeatClick = (e, seatId) => {
    e.stopPropagation();
    const seatClass = document.querySelector(`.${seatId}`).classList;
    if (seatStatus==="available") {
      seatClass.remove("available");
      seatClass.add("selected");
      seatStatus = "selected";
    } else if (seatStatus==="selected") {
      seatClass.remove("selected");
      seatClass.add("available"); 
      seatStatus = "available";
    }
    
  }
  return (
    <div>
      <div 
        className={`seat ${seatId} ${seatStatus}`} 
        onClick={(e) => handleSeatClick(e, seatId)}
      >
        {seatId}
      </div>
    </div>
  )
}

export default Seat
