import { useState, forwardRef } from 'react'
import { useParams } from 'react-router-dom';
import { Grid, VStack, Image, Box, Button, Spinner, HStack, Text, Heading } from '@chakra-ui/react';
import Seat from './Seat';
import axios from 'api/axios';
import { wait } from 'utils/wait';

const Theatre = forwardRef( ({seats}, ref ) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();

  const handleConfirm = async (e) => {
    if (selectedSeats.length!==0) {
      setLoading(true);
      await wait(2000);
      try {
        await axios.put(
          `/api/movies/${movieId}`,
          JSON.stringify({ selectedSeats }),
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
      window.location.reload();
    }
    
  }

  const handleChange = (seat) => {
    setSelectedSeats(prevSelectedSeats => 
      prevSelectedSeats.some(item => (item.row===seat.row && item.col===seat.col))
        ? prevSelectedSeats.filter(item => !(item.row===seat.row && item.col===seat.col))
        : [...prevSelectedSeats, seat]
    )
  }

  return (
    <HStack
      ref={ref}
      gap='5vw'
    >
      <VStack
        gap='5vw'
      >
        <Image
          src={require('assets/theatre-screen.png')}
          alt='theatre-screen'
        />
        <Grid
          templateColumns='repeat(10, 1fr)'
          rowGap='1.8vw'
          columnGap='5vw'
          width='20vw'
          justifyContent='center'
        >
          {
            seats.map(item => {
              return (
                <>
                  <Seat
                    key={`${item.row}-${item.col}`}
                    disabled={item.status===false}
                    value={`${item.row}${item.col}`}
                    icon={<></>}
                    onChange={() => handleChange(item)}
                    sx={{
                      '& .chakra-checkbox__control': {
                        bg: 'grey',
                        borderColor: 'grey',
                        _disabled: {
                          bg: 'red',
                          borderColor: 'red',
                        },
                        _checked: {
                          bg: 'green',
                          borderColor: 'green'
                        }
                      },
                      '& .chakra-checkbox__label': {
                        margin: '-2.4vw',
                        _disabled: {
                          color: 'space-cadet'
                        },
                        _checked: {
                          color: 'space-cadet'
                        }
                      },
                    }}
                  />
                  {
                    (item.col===2 || item.col===6)
                      ? <Box gridColumn='span 1' width='1vw'></Box>
                      : null
                  }
                </>
                
              );
            })
          }
        </Grid>
        <Button 
          variant='solid'
          colorScheme='teal'
          w='15vw'
          h='4vw'
          onClick={handleConfirm}
          disabled={selectedSeats.length===0}
        >
          <HStack>
            <Text
              fontSize='1.5vw'
            >
              Confirm Seats
            </Text>
            {loading && <Spinner size='md'/>}
          </HStack>
        </Button>
      </VStack>
      <VStack
        height='90%'
        justifyContent='center'
        width='15vw'
      >
        <Heading>Selected:</Heading>
        {
          selectedSeats.length>0 
          ?
          <Box display='inline-flex' flexWrap='wrap' justifyContent='center'>
            {
              selectedSeats.map((item, index) => 
                <Heading as='h4'>
                  {item.row}{item.col}{index!==selectedSeats.length-1 ? ",  " : ""}
                </Heading>
              )
            }
          </Box> 
          : 
          <Heading>-</Heading>
        }
      </VStack>
      
    </HStack>
    
    
  );
});

export default Theatre;


// function Theatre({ seats }) {
//   const rowA = seats.slice(0, 8);
//   const rowB = seats.slice(8, 16);
//   const rowC = seats.slice(16, 24);
//   const rowD = seats.slice(24, 32);
//   const rowE = seats.slice(32, 40);
//   const rowF = seats.slice(40, 48);
//   // console.log(rowA[0]?.row?.length)
//   const [ss, setSS] = useState([]);
//   const { movieId } = useParams();
//   const navigate = useNavigate();
//   const handleConfirm = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axiosPrivate.put(`/movies/${movieId}`, 
//         JSON.stringify({ ss }), {
//           headers: {
//             'authorization': `Bearer ${localStorage.getItem("accessToken")}`
//           }
//       });
//       console.log(response.message)
//       navigate("/");
//     } catch (err) {
//       console.error(err.message);
//     }
//   }
//   return (
//     <div>
//       <Grid container>
//           {rowA && rowA.map(seat => (
//             <Seat key={seat.id} md={1.25} seatId={seat.row+seat.col} status={seat.status} ss={ss} setSS={setSS}/>
//           ))}
//       </Grid>
//       <Grid container>
//           {rowB && rowB.map(seat => (
//             <Seat key={seat.id} md={1.25} seatId={seat.row+seat.col} status={seat.status} ss={ss} setSS={setSS}/>
//           ))}
//       </Grid>
//       <br />
//       <br />
//       <Grid container>
//           {rowC && rowC.map(seat => (
//             <Seat key={seat.id} md={1.25} seatId={seat.row+seat.col} status={seat.status} ss={ss} setSS={setSS}/>
//           ))}
//       </Grid>
//       <Grid container>
//           {rowD && rowD.map(seat => (
//             <Seat key={seat.id} md={1.25} seatId={seat.row+seat.col} status={seat.status} ss={ss} setSS={setSS}/>
//           ))}
//       </Grid>
//       <Grid container>
//           {rowE && rowE.map(seat => (
//             <Seat key={seat.id} md={1.25} seatId={seat.row+seat.col} status={seat.status} ss={ss} setSS={setSS}/>
//           ))}
//       </Grid>
//       <Grid container>
//           {rowF && rowF.map(seat => (
//             <Seat key={seat.id} md={1.25} seatId={seat.row+seat.col} status={seat.status} ss={ss} setSS={setSS}/>
//           ))}
//       </Grid>
//       <Button variant='contained' onClick={handleConfirm}>Submit</Button>
//     </div>
//   )
// }

// export default Theatre
