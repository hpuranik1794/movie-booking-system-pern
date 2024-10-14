import { useState, useEffect } from 'react';
import { Box, Heading, Grid, VStack } from '@chakra-ui/react';
import axios from 'api/axios';
import Card from 'components/Card';
import { wait } from 'utils/wait';
import LoadingRing from 'components/LoadingRing';

const Landing = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMoviesData = async () => {
      setLoading(true);
      await wait(1000);
      try {
        const { data: response } = await axios.get("/api/movies");
        setMovies(response);
      } catch (error) {
        console.error(error);
      }
      setLoading(false)
    }

    getMoviesData();
  }, []);
  
  return (
    <Box
      padding={10}
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      {
        loading 
          ? <LoadingRing /> 
          : (
            <VStack
              width='80vw'
              display='flex'
              justifyContent='center'
            >
              <Heading
                color='cool-yellow'
                fontSize='5vw'
              >
                Welcome to Wakanda Cinemas!
              </Heading>
              <Grid 
                templateColumns='repeat(4, 1fr)' 
                justifyContent='space-between' 
                width='90vw'
              >
                {movies.map(item => {
                  return (
                    <Card 
                      {...item}
                    />
                  )
                })}
              </Grid>
            </VStack>
            )
      }

    </Box>
  );
}

export default Landing;
