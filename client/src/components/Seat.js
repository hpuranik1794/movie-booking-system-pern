import { Checkbox, Text } from "@chakra-ui/react";

const Seat = ({ ...props }) => {
  return (
    <Checkbox
      {...props}
    >
      <Text fontSize='1.5vw'>{props.value}</Text>
    </Checkbox>
  );
}

export default Seat;
