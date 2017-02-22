module.exports = () => ({
	module: {
		loaders: [{
			test: /\.ts$/,
			loaders: [
				'ts-loader',
				'angular2-template-loader',
			],
			exclude: /node_modules/,
		}],
	},
})
