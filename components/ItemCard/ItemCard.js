import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import ListItem from '@components/ListItem/ListItem'
import Link from 'next/link'
import { Fragment } from 'react'

const beforeContent = {
	content: `''`,
	position: 'absolute',
	width: '100%',
	height: '100%',
	bg: 'brand.500',
	top: 0,
	left: 0,
}

const hoverState = {
	bgSize: '110%',
}

const ItemCard = ({ products }) => {
	console.log(products)
	return (
		<ListItem
			wrap='wrap'
			justifyContent='center'
			alignItems='center'
			flexDirection={{ base: 'column', md: 'row' }}
		>
			{products.map((product) => (
				<Fragment key={product.id}>
					<Link href='/Product/[id]' as={`/Product/${product.id}`}>
						<Box
							as='div'
							p='3rem'
							bg='blue.100'
							width={{ base: '80%', md: '30%', lg: '22%' }}
							m='4rem'
							rounded='2xl'
							bgImage={`url(${product.image})`}
							bgPos='center'
							bgSize='100%'
							bgRepeat='no-repeat'
							cursor='pointer'
							_before={beforeContent}
							_hover={hoverState}
							position='relative'
							overflow='hidden'
							transition='all 1.5s ease'
						>
							<Flex
								direction='column'
								justifyContent='end'
								zIndex='1'
								position='relative'
							>
								<Heading as='h4' color='brand.100' fontSize='3xl'>
									{product.title}
								</Heading>
								<Text
									color='brand.100'
									fontSize='2xl'
									textTransform='capitalize'
									my='1rem'
								>
									{product.category}
								</Text>
								<Text color='brand.100' fontSize='2xl' mb='1rem'>
									${product.price}
								</Text>
								<Text noOfLines={[1, 2]} color='brand.100' fontSize='1xl'>
									{product.description}
								</Text>
							</Flex>
						</Box>
					</Link>
				</Fragment>
			))}
		</ListItem>
	)
}

export default ItemCard
