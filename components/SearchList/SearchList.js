import { Box, Text } from '@chakra-ui/react'
import Link from 'next/link'

const SearchList = ({ products }) => {
	return (
		<Box as='div' bg='brand.400' p='1rem'>
			{products.map((product) => (
				<Link
					key={product.id}
					href='/Product/[id]'
					as={`/Product/${product.id}`}
					passHref
				>
					<Text color='brand.100' fontSize='1xl' cursor='pointer' m='1rem'>
						{product.title}
					</Text>
				</Link>
			))}
		</Box>
	)
}

export default SearchList
