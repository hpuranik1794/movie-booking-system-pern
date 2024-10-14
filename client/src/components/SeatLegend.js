import { HStack, Box } from '@chakra-ui/react';
import Seat from './Seat'

const SeatLegend = () => {
	return (
		<HStack
			spacing='24px'
			p='2vw'
		>
			<Box
				display='inline-flex'
				gap='0.5vw'
				p='0.5vw'
				paddingLeft='0.7vw'
				paddingRight='0.7vw'
				border='0.05vw solid'
				borderRadius='0.7vw'
			>
				
				<Seat 
					isDisabled
					value='Available'
					sx={{
						'& .chakra-checkbox__control': {
							_disabled: {
								bg: 'grey',
								borderColor: 'grey',
							},
						},
					}}
				/>
			</Box>
			<Box
				display='inline-flex'
				gap='0.5vw'
				p='0.5vw'
				paddingLeft='0.7vw'
				paddingRight='0.7vw'
				border='0.05vw solid'
				borderRadius='0.7vw'
			>
				
				<Seat 
					isDisabled 
					value='Selected' 
					sx={{
						'& .chakra-checkbox__control': {
							_disabled: {
								bg: 'green',
								borderColor: 'green',
							},
						},
					}}
				/>
			</Box>
			<Box
				display='inline-flex'
				gap='0.5vw'
				p='0.5vw'
				paddingLeft='0.7vw'
				paddingRight='0.7vw'
				border='0.05vw solid'
				borderRadius='0.7vw'
			>
				<Seat 
					isDisabled 
					value='Booked'
					sx={{
						'& .chakra-checkbox__control': {
							_disabled: {
								bg: 'red',
								borderColor: 'red',
							},
						},
					}}
				/>
			</Box>
		</HStack>
	)
}

export default SeatLegend;
