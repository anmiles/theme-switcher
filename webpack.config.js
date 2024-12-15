const path                      = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { version }               = require('./package.json');

module.exports = (env) => {
	const isProduction = env.mode === 'production';

	return {
		mode  : env.mode,
		entry : [
			...isProduction ? [] : [ 'react-refresh/runtime' ],
			'./src/index.tsx',
		],
		output : {
			libraryTarget : 'umd',
			filename      : isProduction
				? `theme-switcher-${version}.min.js`
				: `theme-switcher-${version}.js`,
		},
		module : {
			rules : [
				{
					test : /\.tsx?$/,
					use  : [
						{
							loader  : 'ts-loader',
							options : {
								transpileOnly : true,
							},
						},
					],
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
			...isProduction ? [] : [ new ReactRefreshWebpackPlugin() ],
		],
		devtool   : isProduction ? undefined : 'eval-source-map',
		devServer : isProduction
			? undefined
			: {
				static : [
					{
						directory  : path.join(__dirname, 'dev'),
						publicPath : '/',
					},
					{
						directory  : path.join(__dirname, 'src/images'),
						publicPath : '/images',
					},
				],
			},
	};
};
