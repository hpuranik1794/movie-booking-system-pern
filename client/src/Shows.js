import { styled } from '@mui/material/styles';
import { Grid, Button, Container, Paper, Typography, Link } from '@mui/material'
import SearchBar from './components/SearchBar';
import { useContext } from 'react';
import { MovieContext } from './context/MovieContext';
import AuthContext from './context/AuthContext';
import { Navigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Shows = () => {
  const { movies, search, setSearch } = useContext(MovieContext);
  const { auth } = useContext(AuthContext);
  if (!auth?.accessToken) {
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
            (movie.original_title).toLowerCase().includes(search.toLowerCase())
          )).map((movie) => (
            
              <Grid item md={3} key={movie.id} >
                <Link href={`/${movie.id}`}>
                  <Item >
                    <img 
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                      alt={movie.original_title}
                    />
                    <Typography variant='subtitle1'>{movie.original_title}</Typography>
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
