const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');  

const extractSass = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = [
	{
		target: 'web',
		entry: {
			app: './src/index.js',
		},
		output: {
			filename: '[name].bundle.js',
			path: path.resolve(__dirname, 'app/public')
		},
		module: {
			rules: [
				{
					test: /\.scss$/,
					use: extractSass.extract({
							use:[{
									loader: "css-loader" // translates CSS into CommonJS
							}, {
									loader: "sass-loader" // compiles Sass to CSS
							}],
							// use style-loader in development
							fallback: "style-loader"
					})
				},
				{
					test: /\.(png|svg|jpg|gif)$/,
					use: [
						'file-loader'
					]
				},
				{
					test: /\.jsx$/,
					include: /react/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['env', 'react'],
							cacheDirectory: true
						}
					}
				}
			]
		},
		plugins: [
					extractSass,
					new CleanWebpackPlugin(['app']),
					new webpack.ProvidePlugin({
		        $: 'jquery',
		        jQuery: 'jquery',
		        'window.jQuery': 'jquery',
		        Popper: ['popper.js', 'default'],
		        // In case you imported plugins individually, you must also require them here:
		        Util: "exports-loader?Util!bootstrap/js/dist/util",
		        Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
		        
		      })
		]
	},
	{
		target: 'node',
		node: {
		  __dirname: false,
		  __filename: false
		},
		entry: {
			server: './src/server.js',
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'app/server')
		},
	}
];	