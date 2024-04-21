import { Grid, Box, Container, Paper, Typography, Link } from '@mui/material'
// import SearchBar from './components/SearchBar';
import { useContext, useState, useEffect } from 'react';
import { MovieContext } from './context/MovieContext';
import AuthContext from './context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { axiosPrivate } from './api/axios';
import useAxiosPrivate from './hooks/useAxiosPrivate';
import SearchBar2 from "./components/SearchBar2";
import MovieCard from './components/MovieCard';



const Shows = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const axiosPrivate1 = useAxiosPrivate();
  
  useEffect(() => {
    let ignore = false;
    // const controller = new AbortController();
    const getData = async () => {
      try {
        const response = await axiosPrivate1.get("/movies");
        console.log(response.data);
        // isMounted && setMovies(response);
        !ignore && setMovies(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    getData();
    return () => {
      ignore = true;
      // controller.abort();
    }
  }, []);

  const { search, setSearch } = useContext(MovieContext);
  const { auth } = useContext(AuthContext);
  if (!localStorage.getItem("accessToken")) {
    return <Navigate to="/login" replace />
  }
  return (
    <Container  >
      <br />
      <Typography 
        display="flex" 
        justifyContent="center" 
        variant='h4'
      >
        Now Playing
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="15vh"
      >
        <SearchBar2 
          movies={movies} 
          search={search} 
          setSearch={setSearch}
        />
      </Box>
      
      <br />
      <Grid container 
        spacing={2} 
        columnSpacing={2} 
        display="flex" 
        justifyContent="left" 
        alignItems="center"
        alignContent="center"
      >
        {
          movies.filter((movie) => (
            (movie.title).toLowerCase().includes(search.toLowerCase())
          )).map((movie) => (
              <MovieCard movie={movie} />
          ))
        }
        
      </Grid>
    </Container>
  );
}

export default Shows;
