import React from 'react';
import './Seat.css';
import { useContext } from 'react';
import { MovieContext } from './context/MovieContext';
import { useParams } from 'react-router-dom';

const Seat = ({ seatId, seatStatus }) => {
  const { movies, setMovies } = useContext(MovieContext);
  const { movieId } = useParams();

  const movie = movies.find(movie => (movie.id).toString() === movieId);
  const seat = movie?.seats?.find(seat => seat.id.toString() === seatId);
  const otherMovies = movies.filter(movie => movie.id.toString() !== movieId);
  
  const handleSeatClick = (e, seatId) => {
    e.stopPropagation();
    const seatClass = document.querySelector(`.${seatId}`).classList;
    
    if (seatStatus==="available") {
      seatClass.remove("available");
      seatClass.add("selected");
      seatStatus = "selected";
      seat.status = "selected";
      movie.availableSeats -= 1;

      setMovies([...otherMovies, movie]);
      console.log(movies);
    } else if (seatStatus==="selected") {
      seatClass.remove("selected");
      seatClass.add("available"); 
      seatStatus = "available";
      seat.status = "available";
      movie.availableSeats += 1;
      setMovies([...otherMovies, movie]);
      console.log(movies);
    } else return;
    
  }

  return (
    <div 
      className={`seat ${seatId} ${seatStatus}`} 
      onClick={(e) => handleSeatClick(e, seatId)}
    >
      {seatId === "random" ? "" : seatId}
    </div>
  )
}

export default Seat
