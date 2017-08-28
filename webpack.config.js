var debug = process.env.NODE_ENV !== "production";
var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

const prod = process.argv.indexOf('-cub') !== -1;
const staging = process.argv.indexOf('-staging') !== -1;

module.exports = {
	context : __dirname,
	devtool : debug ? "inline-sourcemap" : null,
	entry : "./src/js/client.js",
	module : {
		loaders : [
			{
				test : /\.(js|jsx)$/,
				exclude : /node_modules/,
				loader : 'babel-loader',
				query : {
					presets : ['react', 'es2015', 'stage-0', 'env'],
					plugins : ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
				}
			}
		]
	},
	output : {
		path : path.resolve('./src/'),
		filename : "client.min.js",
		// publicPath: "http://localhost:8080/src/bundles/",
	},
	plugins : [
	    new webpack.DefinePlugin({
		  	'process.env': {
		  		'NODE_ENV' : (prod) ? '"production"' : (staging) ? '"staging"' :'"development"'
		  	}
		}),
		new webpack.HotModuleReplacementPlugin(),
	    new webpack.NoErrorsPlugin(),
	    new BundleTracker({filename: './webpack-stats.json'}),
	]
};
