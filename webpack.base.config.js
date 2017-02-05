/* globals __dirname, process, require, module */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

// builds an object like { "sqlite3": "commonjs sqlite3", ... }
// with each entry in node_modules
const nodeModules =
    fs.readdirSync('node_modules')
    .filter(x => ['.bin'].indexOf(x) === -1)
    .map(moduleName => ({ [moduleName]: `commonjs ${moduleName}` }))
    .reduce(Object.assign);

var config = {
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "assets/entry.[name].js",
        chunkFilename: "assets/dependency.[id].js",
        publicPath: '',
    },
    module: {
        loaders: [
            { test: /\.js$/, include: [path.resolve(__dirname, 'src/')], loader: 'babel-loader' },
            { test: /\.css$/, loader: "style!css?-minimize" },
            { test: /\.scss$/, loader: 'style?-singleton!css?-minimize&modules!sass'},
            { test: /\.png$/, loader: 'file?name=assets/[hash].[ext]'},
            { test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file?name=assets/[hash].[ext]" },
            { test: /\.json$/, loader: 'json' }
        ]
    },
    node: {
        __dirname: false,
        __filename: false
    },
    plugins: [
        // so react will build in 'production mode'
        // https://github.com/webpack/webpack/issues/868
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"' + NODE_ENV + '"'
        }),
        new webpack.optimize.DedupePlugin(),
        // drop other locales from moment for size
        new webpack.ContextReplacementPlugin(/moment\/locale$/, /en|es/)
    ],
    resolve: {
        // root: [path.join(__dirname, 'src/client')],
        extensions: ["", ".webpack.js", ".web.js", ".js", ".scss"],
        alias: {
            // force a single react version (a hack for some dep.. I forget which)
            react: path.join(__dirname, 'node_modules/react')
        }
    },
    externals: nodeModules
};

if (NODE_ENV === 'production') {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
}

module.exports = config;
