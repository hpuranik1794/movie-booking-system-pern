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
  // return (
  //   <Container  >
  //     <br />
  //     <Typography 
  //       display="flex" 
  //       justifyContent="center" 
  //       variant='h4'
  //     >
  //       Now Playing
  //     </Typography>
  //     <Box
  //       display="flex"
  //       justifyContent="center"
  //       alignItems="center"
  //       minHeight="15vh"
  //     >
  //       <SearchBar2 
  //         movies={movies} 
  //         search={search} 
  //         setSearch={setSearch}
  //       />
  //     </Box>
      
  //     <br />
  //     <Grid container 
  //       spacing={2} 
  //       columnSpacing={2} 
  //       display="flex" 
  //       justifyContent="left" 
  //       alignItems="center"
  //       alignContent="center"
  //     >
  //       {
  //         movies.filter((movie) => (
  //           (movie.title).toLowerCase().includes(search.toLowerCase())
  //         )).map((movie) => (
  //             <MovieCard movie={movie} />
  //         ))
  //       }
        
  //     </Grid>
  //   </Container>
  // );
}

export default Landing;
