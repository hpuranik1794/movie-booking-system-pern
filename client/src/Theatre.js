import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Stack, Box, Button, Container, Paper, Typography, Link } from '@mui/material'
import Seat from './Seat';
import { axiosPrivate } from './api/axios';

function Theatre({ seats }) {
  const rowA = seats.slice(0, 8);
  const rowB = seats.slice(8, 16);
  const rowC = seats.slice(16, 24);
  const rowD = seats.slice(24, 32);
  const rowE = seats.slice(32, 40);
  const rowF = seats.slice(40, 48);
  // console.log(rowA[0]?.row?.length)
  const [ss, setSS] = useState([]);
  const { movieId } = useParams();
  const navigate = useNavigate();
  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.put(`/movies/${movieId}`, 
        JSON.stringify({ ss }), {
          headers: {
            'authorization': `Bearer ${localStorage.getItem("accessToken")}`
          }
      });
      console.log(response.message)
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  }
  return (
    <div>
      <Grid container>
          {rowA && rowA.map(seat => (
            <Seat key={seat.id} md={1.25} seatId={seat.row+seat.col} status={seat.status} ss={ss} setSS={setSS}/>
          ))}
      </Grid>
      <Grid container>
          {rowB && rowB.map(seat => (
            <Seat key={seat.id} md={1.25} seatId={seat.row+seat.col} status={seat.status} ss={ss} setSS={setSS}/>
          ))}
      </Grid>
      <br />
      <br />
      <Grid container>
          {rowC && rowC.map(seat => (
            <Seat key={seat.id} md={1.25} seatId={seat.row+seat.col} status={seat.status} ss={ss} setSS={setSS}/>
          ))}
      </Grid>
      <Grid container>
          {rowD && rowD.map(seat => (
            <Seat key={seat.id} md={1.25} seatId={seat.row+seat.col} status={seat.status} ss={ss} setSS={setSS}/>
          ))}
      </Grid>
      <Grid container>
          {rowE && rowE.map(seat => (
            <Seat key={seat.id} md={1.25} seatId={seat.row+seat.col} status={seat.status} ss={ss} setSS={setSS}/>
          ))}
      </Grid>
      <Grid container>
          {rowF && rowF.map(seat => (
            <Seat key={seat.id} md={1.25} seatId={seat.row+seat.col} status={seat.status} ss={ss} setSS={setSS}/>
          ))}
      </Grid>
      <Button variant='contained' onClick={handleConfirm}>Submit</Button>
    </div>
  )
}

export default Theatre
