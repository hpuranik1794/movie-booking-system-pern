import React from 'react'
import { useParams } from 'react-router-dom';
import Seat from './Seat';

function MovieInfo({ movies, setMovies }) {
  const { movieId } = useParams();
  const movie = movies.find(movie => (movie.id).toString() === movieId);
  const rowA = movie?.seats.slice(0, 8);
  const rowB = movie?.seats.slice(8, 16);
  const rowC = movie?.seats.slice(16, 24);
  const rowD = movie?.seats.slice(24, 32);
  const rowE = movie?.seats.slice(32, 40);
  const rowF = movie?.seats.slice(40, 48);
  return (
  
    <main>
      <article>
        {movie && 
        <>
          <h2>{movie.original_title}</h2>
          <p>{movie.overview}</p>
          
        </>}
      </article>
      <div>
          {rowA && rowA.map(seat => (
            <Seat seatId={seat.id} seatStatus={seat.status}/>
          ))}
      </div>
      <div>
          {rowB && rowB.map(seat => (
            <Seat seatId={seat.id} seatStatus={seat.status}/>
          ))}
      </div>
      <div>
          {rowC && rowC.map(seat => (
            <Seat seatId={seat.id} seatStatus={seat.status}/>
          ))}
      </div>
      <div>
          {rowD && rowD.map(seat => (
            <Seat seatId={seat.id} seatStatus={seat.status}/>
          ))}
      </div>
      <div>
          {rowE && rowE.map(seat => (
            <Seat seatId={seat.id} seatStatus={seat.status}/>
          ))}
      </div>
      <div>
          {rowF && rowF.map(seat => (
            <Seat seatId={seat.id} seatStatus={seat.status}/>
          ))}
      </div>
      
    </main>
      
  )
}

export default MovieInfo
