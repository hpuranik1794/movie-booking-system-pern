import React from 'react';
import './Seat.css';
import { useContext } from 'react';
import { MovieContext } from './context/MovieContext';
import { useParams } from 'react-router-dom';

const Seat = ({ seatId, status, ss, setSS }) => {
  // const { movies, setMovies } = useContext(MovieContext);
  // const { movieId } = useParams();

  // const movie = movies.find(movie => (movie.id).toString() === movieId);
  // const seat = movie?.seats?.find(seat => seat.id.toString() === seatId);
  // const otherMovies = movies.filter(movie => movie.id.toString() !== movieId);
  
  // const handleSeatClick = (e, seatId) => {
  //   e.stopPropagation();
  //   const seatClass = document.querySelector(`.${seatId}`).classList;
    
  //   if (seatStatus==="available") {
  //     seatClass.remove("available");
  //     seatClass.add("selected");
  //     seatStatus = "selected";
  //     seat.status = "selected";
  //     movie.availableSeats -= 1;

  //     setMovies([...otherMovies, movie]);
  //     console.log(movies);
  //   } else if (seatStatus==="selected") {
  //     seatClass.remove("selected");
  //     seatClass.add("available"); 
  //     seatStatus = "available";
  //     seat.status = "available";
  //     movie.availableSeats += 1;
  //     setMovies([...otherMovies, movie]);
  //     console.log(movies);
  //   } else return;
    
  // }

  // return (
  //   <div 
  //     className={`seat ${seatId} ${seatStatus}`} 
  //     onClick={(e) => handleSeatClick(e, seatId)}
  //   >
  //     {seatId === "random" ? "" : seatId}
  //   </div>
  // )

  const handleSeatClick = (e, seatId) => {
    e.stopPropagation();
    const cl = document.querySelector(`.${seatId}`).classList;
    console.log(cl);
    if (cl[2]==="av") {
      cl.remove("av");
      cl.add("select");
      const temp = [...ss];
      temp.push(seatId);
      setSS(temp);
      console.log(ss);
    } else if (cl[2]==="select") {
      cl.remove("select");
      cl.add("av");
      setSS(ss.filter((s) => s!=seatId));
      console.log(ss);
    } else return;
  }
  return (
    seatId==="random" ? (
      <div className={`seat ${seatId} ${status}`} ></div>
    ) : (
      <div 
        className={`seat ${seatId} ${status===true ? "av" : "booked"}`}
        onClick={(e) => handleSeatClick(e, seatId)}
      >
        {seatId}
      </div>
    )
  )
}

export default Seat;
