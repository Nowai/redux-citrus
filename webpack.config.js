var webpack = require('webpack');
var path = require('path');

const projectName = 'redux-citrus';
const fileName = projectName + '.js';

// build umd for production
const umd = {
	output: {
		path: __dirname + '/dist/',
		filename: fileName,
		library: projectName,
		libraryTarget: 'umd',
		umdNamedDefine: true,
		publicPath: '/dist/'
	},
	entry: './export.tsx',
	externals: {
		"react": "React",
		"react-dom": "ReactDOM"
	},
}

// build spa for development
const dev = {
	output: {
		path: __dirname + '/build/',
		filename: fileName
	},
	entry: './index.tsx',
}

const base = {
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx']
	},
	context: path.resolve(__dirname, './src'),
	devServer: {
		contentBase: path.resolve(__dirname, './build')
	},
	module: {
		rules: [
			{
				test: /\.ts(x?)$|\.js$/,
				use: [
					'babel-loader', 'ts-loader'
				],
				exclude: /node_modules/
			},
			{
				test: /\.scss$|\.sass$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							includePaths: [
								path.resolve(__dirname, './src/styles'),
								path.resolve(__dirname, './node_modules/normalize-scss/sass')
							]
						}
					}
				]
			}
		]
	}
}

module.exports = (env, argv) => {
	return Object.assign({}, base, argv.mode === 'production' ? umd : dev);
}