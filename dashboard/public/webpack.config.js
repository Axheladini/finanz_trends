const path = require('path');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [
	{
		mode: process.env.NODE_ENV,
		entry: {
			'sce-main': ['./src/scss/main.scss'],
		},
		output: {},
		module: {
			rules: [
				{
					test: /\.scss$/,
					exclude: /(node_modules|bower_components)/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
						},
						{
							loader: 'css-loader',
							options: {
								sourceMap: true,
								url: false,
							},
						},
						'sass-loader',
					],
				},
			],
		},
		devtool: 'source-map',
		plugins: [new FixStyleOnlyEntriesPlugin(), new MiniCssExtractPlugin()],
	},
];