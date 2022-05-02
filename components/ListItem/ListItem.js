import { Flex } from '@chakra-ui/react'

const ListItem = ({ children, ...otherProps }) => {
	return <Flex {...otherProps}>{children}</Flex>
}

export default ListItem
