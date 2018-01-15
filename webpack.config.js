const webpack = require('webpack');
const debug = process.env.NODE_ENV !== "production";

module.exports = {
    devtool: debug ? "inline-sourcemap" : false,

    //define entry point
    entry: './src/js/index.jsx',

    //define output point
    output: {
        filename: './bundle.js'
    },

    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-0'],
                plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties']
            }
        },
        {
            test: /\.scss$/,
            loader: 'style-loader!css-loader!sass-loader'
        }
        ] //loaders
    }, //module

    // you can now require('file') instead of require('file.jsx/js')
    resolve: {
        extensions: ['.js', '.jsx', '.es6'],
    },

    // dont produce file in dev environment
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ]
};