import { Box, Heading } from '@chakra-ui/react'
import Link from 'next/link'

const Header = () => {
	return (
		<Box as='header' bg='brand.200'>
			<Link href='/' passHref>
				<Heading color='brand.100' p='6' cursor='pointer'>
					Disecto
				</Heading>
			</Link>
		</Box>
	)
}

export default Header
