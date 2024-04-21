import { Box, Stack, Typography } from "@mui/material";

{/* <div>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
       <img src={`https://image.tmdb.org/t/p/w600${movie.backdrop_path}`} alt=""/>
      <img src={`https://image.tmdb.org/t/p/w500/8uVKfOJUhmybNsVh089EqLHUYEG.jpg`} alt=""/>
      
    </div> */}

    {/* <iframe width="800" height="450"
        src="https://www.youtube.com/embed/rJxVPQRrRxc">
      </iframe> */}

const MovieInfo = ({ movie }) => {
  return (
    <Stack direction="row" sx={{ padding: 5}}>
      <Box
        component="img"
        sx={{
          height: 450,
          width: 500
        }}
        alt={`${movie.title}`}
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
      />
      
      <Box sx={{ padding: 10, display: 'flex', justifyContent: 'top' }}>
        <Stack maxWidth={400}>
          <Typography variant='h4'>{movie.title}</Typography>
          <br />
          <Typography variant='body1'>{movie.overview}</Typography>
        </Stack>
      </Box>
      
      
    </Stack>
  )
}

export default MovieInfo;
