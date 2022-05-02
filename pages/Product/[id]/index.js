import Head from 'next/head'
import {
	Box,
	Flex,
	Heading,
	Image,
	Text,
	Divider,
	Input,
	Textarea,
	Button,
} from '@chakra-ui/react'
import Header from '@components/Header/Header'
import Comments from '@components/Comments/Comments'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ReactStars from 'react-rating-stars-component'
import { useDispatch } from 'react-redux'
import { addComment } from '@features/products/productSlice'

const ROOT_URL = process.env.NEXT_PUBLIC_ROOT_URL
const focusState = {
	outline: ' none',
	border: '1px solid brand.300',
}

const Product = ({ product }) => {
	const comments = product.comments
	const [userComment, setUserComment] = useState({
		author: '',
		comment: '',
	})
	const { author, comment } = userComment

	console.log(comments)
	const dispatch = useDispatch()
	const router = useRouter()

	const handleChange = (e) => {
		const name = e.target.name
		const value = e.target.value

		setUserComment((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		const productId = router.query.id
		const commentData = {
			author,
			comment,
		}
		dispatch(addComment([productId, commentData]))
	}

	return (
		<>
			<Head>
				<title>Product Review</title>
				<meta name='description' content='Product Review Page' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Header />
			<Box as='div' my='5rem'>
				<Flex
					alignItems={{ base: 'center', md: 'flex-start' }}
					justifyContent='space-around'
					flexDirection={{ base: 'column', md: 'row' }}
					gap={{ base: '2rem', md: 'none' }}
				>
					<Box as='div' width='40%'>
						<Image src={product.image} alt='product image' />
					</Box>
					<Box as='div' px={{ base: '2rem', md: 'none' }} flexBasis='40%'>
						<Heading as='h3' color='brand.100'>
							{product.title}
						</Heading>

						<Flex alignItems='center' gap='1rem'>
							<ReactStars
								count={5}
								value={product.rating.rate}
								size={20}
								activeColor='#ffd700'
								isHalf='true'
								edit='false'
							/>
							<Text as='span' color='brand.100'>
								{product.rating.count} reviews
							</Text>
						</Flex>

						<Text color='brand.100' my='1rem' fontSize='3xl' fontWeight='bold'>
							${product.price}
						</Text>
						<Text color='brand.100' fontSize='2xl'>
							{product.description}
						</Text>
						<Text
							display='block'
							mt='1.5rem'
							mb='1rem'
							color='brand.100'
							fontSize='3xl'
						>
							Category:{' '}
						</Text>
						<Text color='brand.100' fontSize='2xl' textTransform='capitalize'>
							{product.category}
						</Text>
						<Divider
							orientation='horizontal'
							py='2rem'
							borderColor='brand.100'
						/>
						<Text display='block' mt='.5rem' color='brand.100' fontSize='3xl'>
							Reviews:{' '}
						</Text>
						<Comments comments={comments} />
					</Box>
				</Flex>

				<Box as='div' py='4rem' px='6rem'>
					<Heading as='h3' color='brand.100' my='3rem'>
						{' '}
						Leave a Review
					</Heading>
					<Input
						type='text'
						height='4rem'
						width={{ base: '100%', md: '60%', lg: '50%' }}
						border='none'
						fontSize='2xl'
						color='brand.100'
						bg='brand.400'
						_focus={focusState}
						placeholder='Enter your name'
						name='author'
						value={author}
						onChange={handleChange}
					/>
					<Textarea
						d='block'
						resize='none'
						width={{ base: '100%', md: '60%', lg: '50%' }}
						border='none'
						fontSize='2xl'
						color='brand.100'
						bg='brand.400'
						_focus={focusState}
						my='2rem'
						type='text'
						placeholder='Write something about the product'
						name='comment'
						value={comment}
						onChange={handleChange}
					/>

					<Button
						bg='brand.300'
						fontSize='2xl'
						size='lg'
						type='submit'
						onClick={handleSubmit}
					>
						Submit
					</Button>
				</Box>
			</Box>
		</>
	)
}

export default Product

export const getStaticProps = async (context) => {
	const { id } = context.params
	const res = await axios.get(`${ROOT_URL}/${id}`)
	const product = res.data
	return {
		props: {
			product,
		},
		revalidate: 30,
	}
}

export const getStaticPaths = async () => {
	const products = await axios.get(`${ROOT_URL}`)

	const paths = products.data.map((product) => ({
		params: { id: product.id.toString() },
	}))

	return {
		paths,
		fallback: false,
	}
}
