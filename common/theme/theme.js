import { extendTheme } from '@chakra-ui/react'

const config = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
}

const theme = extendTheme({
	config,
	colors: {
		brand: {
			100: '#f7fafc',
			200: '#1b1e24',
			300: '#00c39a',
			400: '#151b24',
			500: '#0d200b7a',
			600: '#00795e',
			700: '#ce3332',
		},
	},
	fonts: {
		heading: 'Open Sans, sans-serif',
		body: 'Raleway, sans-serif',
	},
	fontWeights: {
		hairline: 100,
		thin: 200,
		light: 300,
		normal: 400,
		medium: 500,
		semibold: 600,
		bold: 700,
		extrabold: 800,
		black: 900,
	},
})

export default theme
