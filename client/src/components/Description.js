import { VStack, HStack, Image, Text, Heading } from "@chakra-ui/react";

const Description = ({ title, overview, backdrop_path }) => {
  return (
    <VStack
      gap='2vw'
    >
      <Heading fontSize='4vw' margin='2vw'>
        {title}
      </Heading>
      <HStack
        gridGap='3vw'
      >
        <Image
          src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
          alt={title}
          objectFit='contain'
          borderRadius='2vw'
          width='35vw'
          p='1vw'
          margin='1vw'
        />
        <VStack
          alignItems='flex-start'
          p='1vw'
          margin='1vw'
        >
          <Heading margin='0' fontSize='2vw'>
            Plot
          </Heading>
          <Text
            fontSize='2vw'
            margin='0'
          >
            {overview}
          </Text>
        </VStack>
      </HStack>
      
    </VStack>
  );
}

export default Description;
