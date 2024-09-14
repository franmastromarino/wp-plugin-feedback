const path = require('path');
const defaultConfig = require('./node_modules/@wordpress/scripts/config/webpack.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const globImporter = require('node-sass-glob-importer');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = [
	{
		...defaultConfig,
		entry: {
			index: path.resolve(__dirname, 'packages', './index.js'),
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'build/js/'),
		},
		optimization: {
			minimize: isProduction,
		}
	},
	{
		...defaultConfig,
		entry: {
			index: path.resolve(__dirname, 'packages', './style.scss'),
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'build/css/'),
		},
		module: {
			...defaultConfig.module,
			rules: [
				{
					test: /\.scss$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
						},
						{
							loader: 'sass-loader',
							options: {
								sassOptions: {
									importer: globImporter(),
								},
							},
						},
					],
				},
			],
		},
		plugins: [
			new RemoveEmptyScriptsPlugin(),
			new MiniCssExtractPlugin({
				filename: 'style.css',
			}),
		],
	},
];
