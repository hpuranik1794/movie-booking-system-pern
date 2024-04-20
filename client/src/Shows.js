import { styled } from '@mui/material/styles';
import { Grid, Button, Container, Paper, Typography, Link } from '@mui/material'
import SearchBar from './components/SearchBar';
import { useContext, useState, useEffect } from 'react';
import { MovieContext } from './context/MovieContext';
import AuthContext from './context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { axiosPrivate } from './api/axios';
import useAxiosPrivate from './hooks/useAxiosPrivate';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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
    <Container>
      <br />
      <Typography 
        display="flex" 
        justifyContent="center" 
        variant='h4'>
        Now Playing
      </Typography>
      <SearchBar 
        search={search} 
        setSearch={setSearch} 
      />
      <br />
      <Grid container 
        spacing={2} 
        columnSpacing={2} 
        display="flex" 
        justifyContent="center" 
      >
        {
          movies.filter((movie) => (
            (movie.title).toLowerCase().includes(search.toLowerCase())
          )).map((movie) => (
            
              <Grid item md={3} key={movie.movie_id} >
                <Link href={`/${movie.movie_id}`}>
                  <Item >
                    <img 
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                      alt={movie.title}
                    />
                    <Typography variant='subtitle1'>{movie.title}</Typography>
                  </Item>
                </Link>
              </Grid>
          ))
        }
      </Grid>
    </Container>
  );
}

export default Shows;
