import { Grid, Link, Paper, Typography, alpha } from "@mui/material";
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  "&:hover": {
    backgroundColor: 'hsl(0, 0%, 94%)'
  },
}));

const MovieCard = ({ movie }) => {
  return (
    <Grid item md={3} key={movie.movie_id} >
      <Link href={`/${movie.movie_id}`} underline="none">
        <Item >
          <img 
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
            alt={movie.title}
          />
          <Typography variant='subtitle1'>{movie.title}</Typography>
        </Item>
      </Link>
    </Grid>
  )
}

export default MovieCard;
