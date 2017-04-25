// var webpack = require('webpack')
var path = require('path')
var phaserModule = path.join(__dirname, '/node_modules/phaser/')
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
var pixi = path.join(phaserModule, 'build/custom/pixi.js')
var p2 = path.join(phaserModule, 'build/custom/p2.js')

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: {
		app: "./src/init.ts"
	},
	output: {
		path: path.join(__dirname, './'),
		filename: 'dist/app.js'
	},
	module: {
		rules: [
			{ test: /\.png$/, loader: 'url-loader?limit=20480&name=/dist/assets/[hash].[ext]' },
			{ test: /\.jpg|\.svg|\.mp3$/, loader: 'file-loader?name=/dist/assets/[hash].[ext]' },
			{ test: /\.tsx?$/, loaders: ['ts-loader'] },
			{ test: /pixi.js|p2.js/, loader: "script-loader" }
		]
	},
	resolve: {
		alias: {
			'phaser': phaser,
			'pixi.js': pixi,
			'p2.js': p2,
		},
		extensions: ['.webpack.js', '.tsx', '.ts', '.js']
	},
	plugins: [
	]
}
