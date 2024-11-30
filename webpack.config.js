const path              = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
	const version = require('./package.json').version;
	const ext     = env['mode'] === 'production' ? '.min.js' : '.js';

	return {
		entry  : './src/index.tsx',
		output : {
			filename      : `theme-switcher-${version}${ext}`,
			libraryTarget : 'umd',
		},
		mode   : env['mode'],
		module : {
			rules : [
				{
					test    : /\.tsx?$/,
					use     : 'ts-loader',
					exclude : /node_modules/,
				},
				{
					test : /\.css$/,
					use  : [ 'style-loader', 'css-loader' ],
				},
			],
		},
		resolve : {
			extensions : [ '.tsx', '.ts', '.js' ],
		},
		externals : {
			'react'     : 'React',
			'react-dom' : 'ReactDOM',
		},
		plugins : [
			new CopyWebpackPlugin({
				patterns : [
					{
						from        : 'src',
						globOptions : {
							ignore : [ '**/*.ts', '**/*.tsx' ],
						},
					},
				],
			}),
		],
		devServer : {
			static : [
				{
					directory  : path.join(__dirname, 'debug'),
					publicPath : '/',
				},
				{
					directory  : path.join(__dirname, 'dist'),
					publicPath : '/dist',
				},
			],
			watchFiles : [
				'src/**/*',
				'debug/**/*',
			],
		},
	};
};
