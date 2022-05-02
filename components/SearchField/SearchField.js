import { Input } from '@chakra-ui/react'
import { useState } from 'react'

const focusState = {
	outline: ' none',
	border: '1px solid brand.300',
}

const SearchField = ({ handleChange }) => {
	const [searchQuery, setSearchQuery] = useState()

	const search = (e) => {
		setSearchQuery(e.target.value)
		handleChange(searchQuery)
	}

	return (
		<>
			<Input
				type='text'
				height='5rem'
				width={{ base: '100%', md: '60%', lg: '50%' }}
				value={searchQuery}
				onChange={search}
				placeholder='What are you looking for'
				border='none'
				rounded='full'
				position='relative'
				fontSize='2xl'
				color='brand.100'
				bg='brand.400'
				px='2rem'
				_focus={focusState}
			/>
		</>
	)
}

export default SearchField
