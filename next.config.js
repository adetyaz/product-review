module.exports = {
	reactStrictMode: true,
	async rewrite() {
		return [
			{
				source: '/product/[id]',
				destination: '/Product/[id]',
			},
		]
	},
}
