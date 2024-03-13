
import { styled } from '@mui/material/styles';
import { Grid, Stack, Box, Container, Paper, Typography, Link } from '@mui/material'
import SearchBar from './components/SearchBar';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto',
//   },
//   backgroundColor: 'blue'
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));


const Shows = ({ movies, setMovies, search, setSearch }) => {
  
  return (
    <Container>
      <br />
      <Typography  display="flex" justifyContent="center" variant='h4'>Now Playing</Typography>
      
      <SearchBar search={search} setSearch={setSearch} />
      <br />
      
      <Grid container spacing={2} columnSpacing={2} display="flex" justifyContent="center" >
        {
          movies.filter((movie) => (
            (movie.original_title).toLowerCase().includes(search.toLowerCase())
          )).map((movie) => (
            
              <Grid item md={3} key={movie.id} >
                <Link href={`/${movie.id}`}>
                  <Item >
                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.original_title}/>
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
