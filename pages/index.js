import { Flex, Heading, Text } from '@chakra-ui/react'
import Header from '@components/Header/Header'
import ItemCard from '@components/ItemCard/ItemCard'

import SearchField from '@components/SearchField/SearchField'
import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts, reset } from '@features/products/productSlice'
import { useEffect, useState } from 'react'
import SearchList from '@components/SearchList/SearchList'

export default function Home() {
	const [errorMessage, setErrorMessage] = useState('')
	const [suggestedProducts, setSuggestProducts] = useState()
	const [showList, setShowList] = useState(false)
	const dispatch = useDispatch()
	const { products, isError, isLoading, message } = useSelector(
		(state) => state.products
	)

	useEffect(() => {
		if (isError) {
			console.log(message)
			dispatch(reset())
		}

		dispatch(getProducts())
	}, [dispatch])

	const handleChange = (query) => {
		if (query !== '') {
			if (/^[a-zA-Z]+$/.test(query) === false) {
				setErrorMessage('Alphabets Only Please')
			} else {
				setErrorMessage('')
			}
			console.log(query)
			setShowList(true)
		}
		const productResults = products.filter(
			(product) =>
				query && product.title.toLowerCase().includes(query.toLowerCase())
		)
		console.log(productResults)
		setSuggestProducts(productResults)
	}

	return (
		<>
			<Head>
				<title>Product Review</title>
				<meta name='description' content='Product Review website' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Header />
			<Flex direction='column' alignItems='center' m='4rem'>
				<SearchField handleChange={handleChange} />
				{showList === true && <SearchList products={suggestedProducts} />}
				{errorMessage.length !== 0 && (
					<Text color='brand.700'>{errorMessage}</Text>
				)}
				<ItemCard products={products} />
			</Flex>
		</>
	)
}
