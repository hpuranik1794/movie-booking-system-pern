import { Link, Image, Heading, Box } from "@chakra-ui/react";

const Card = ({ movie_id, title, poster_path }) => {
  return (
    <Link 
      key={movie_id}
      bg='cool-yellow' 
      borderRadius='1vw' 
      justifyContent='center'
      margin='1vw'
      height='32vw'
      href={movie_id}
    >
      <Image 
        src={`https://image.tmdb.org/t/p/w200${poster_path}`} 
        alt={title} 
        objectFit='fill'
        borderRadius='1vw'
        width='100%'
        height='27vw'
      />
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        height='4vw'
      >
        <Heading 
          fontSize='1.5vw' 
          textAlign='center'
          color='space-cadet'
          overflowWrap='break-word'
          margin='0'
        >
          {title}
        </Heading>
      </Box>
      
    </Link>
  )
}

export default Card;
