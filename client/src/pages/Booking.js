import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { Box, VStack, Button, Text } from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons";
import axios from 'api/axios';
import { wait } from 'utils/wait';
import LoadingRing from 'components/LoadingRing';
import Description from 'components/Description';
import SeatLegend from 'components/SeatLegend';
import Theatre from 'components/Theatre';

function Booking() {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const [seats, setSeats] = useState([]);
  const [visible, setVisible] = useState(false);
  const theatreRef = useRef(null);

  const toggleTheatre = () => {
    setVisible(!visible);
  }

  useEffect(() => {
    if (visible) {
      theatreRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [visible])

  useEffect(() => {
    const getMovie = async () => {
      setLoading(true);
      await wait(2000);
      try {
        const p1 = axios.get(`/api/movies/${movieId}`);
        const p2 = axios.get(`/api/movies/seats/${movieId}`);
        const [movieInfo, seats] = await Promise.all([p1, p2]);
        
        setMovie(movieInfo.data);
        setSeats(seats.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }

    getMovie();
  }, [movieId]);
  
  return (
    <Box
      padding={10}
      display='flex'
      justifyContent='center'
      color='cool-teal'
    >
      {
        loading
          ? <LoadingRing /> 
          : (
            <VStack
              gap='1vw'
            >
              <Description {...movie} />
              <Button  
                variant='ghost'
                justifyContent='space-evenly'
                border='0.1vw solid'
                borderRadius='0'
                p='3vw'
                onClick={toggleTheatre}
              >
                <Text
                  fontSize='2vw'
                >
                  BOOK MOVIE
                </Text>
                <ChevronDownIcon boxSize='4vw'/>
              </Button>
              {
                visible &&
                <VStack
                  rowGap='3vw'
                >
                  <SeatLegend />
                  <Theatre ref={theatreRef} seats={seats} />
                </VStack>
              }

            </VStack>
          )
      }
    </Box>
  );
}

export default Booking;
