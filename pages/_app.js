import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@common/theme/theme'
import '@fontsource/raleway/400.css'
import '@fontsource/open-sans/700.css'
import { Provider } from 'react-redux'
import { store } from '@app/store'

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</Provider>
	)
}

export default MyApp
