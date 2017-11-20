const path = require('path');

module.exports = {
	entry: path.resolve(__dirname, './src/index.js'),
	output: {
		path: path.resolve(__dirname, './public/js'),
		filename: 'bundle.js'
	},
	module : {
		loaders: [
			{ 
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: [ 'es2015', 'stage-2', 'react' ]
				}
			},
			{ 
				test: /\.css$/,
				loader: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url-loader?limit=10000&name=[hash].[ext]&publicPath=public/&outputPath=../'
			}
		]
	}
};
