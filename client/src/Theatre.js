import React from 'react'
import { Grid, Stack, Box, Container, Paper, Typography, Link } from '@mui/material'
import Seat from './Seat';

function Theatre({ movie }) {
  const rowA = movie?.seats.slice(0, 8);
  const rowB = movie?.seats.slice(8, 16);
  const rowC = movie?.seats.slice(16, 24);
  const rowD = movie?.seats.slice(24, 32);
  const rowE = movie?.seats.slice(32, 40);
  const rowF = movie?.seats.slice(40, 48);
  return (
    <div>
      <Grid container>
          {rowA && rowA.map(seat => (
            <Seat key={seat.id} md={1.25} seatId={seat.id} seatStatus={seat.status}/>
          ))}
      </Grid>
      <Grid container>
          {rowB && rowB.map(seat => (
            <Seat key={seat.id} md={1.25} seatId={seat.id} seatStatus={seat.status}/>
          ))}
      </Grid>
      <br />
      <br />
      <Grid container>
          {rowC && rowC.map(seat => (
            <Seat key={seat.id} md={1.25} seatId={seat.id} seatStatus={seat.status}/>
          ))}
      </Grid>
      <Grid container>
          {rowD && rowD.map(seat => (
            <Seat key={seat.id} md={1.25} seatId={seat.id} seatStatus={seat.status}/>
          ))}
      </Grid>
      <Grid container>
          {rowE && rowE.map(seat => (
            <Seat key={seat.id} md={1.25} seatId={seat.id} seatStatus={seat.status}/>
          ))}
      </Grid>
      <Grid container>
          {rowF && rowF.map(seat => (
            <Seat key={seat.id} md={1.25} seatId={seat.id} seatStatus={seat.status}/>
          ))}
      </Grid>
    </div>
  )
}

export default Theatre
