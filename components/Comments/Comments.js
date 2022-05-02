import { Box, Divider, Text } from '@chakra-ui/react'

const Comments = ({ comments }) => {
	return (
		<>
			{comments.map((comment) => (
				<Box
					as='div'
					borderY
					borderColor='brand.400'
					py='3rem'
					key={comment.id}
				>
					<Text color='brand.100' fontSize='2xl'>
						{comment.comment}
					</Text>
					<Text color='brand.100' my='1rem'>
						Author: {comment.author}
					</Text>
					<Divider orientation='horizontal' borderColor='brand.100' />
				</Box>
			))}
		</>
	)
}

export default Comments
