/* globals __dirname, process, require, module */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';

// builds an object like { "sqlite3": "commonjs sqlite3", ... }
// with each entry in node_modules
// re-written but inspired by: http://jlongster.com/Backend-Apps-with-Webpack--Part-I
const nodeModules =
    fs.readdirSync('node_modules')
    .filter(x => ['.bin'].indexOf(x) === -1)
    .map(moduleName => ({ [moduleName]: `commonjs ${moduleName}` }))
    .reduce(Object.assign);

var config = {
    // The following are to be defined by derived configs
    // - entry: {},
    // - target: ''
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "assets/entry.[name].js",
        chunkFilename: "assets/dependency.[id].js",
        publicPath: '',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [ /node_modules/ ], // only babel-ize our own code
                use: ['babel-loader' ]
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader', options: { singleton: false } },
                    { loader: 'css-loader', options: { minimize: false, modules: true } },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test:/\.png$/,
                use: [
                    { loader: 'file-loader', options: { name: 'assets/[hash].[ext]' } }
                ]
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    { loader: 'file-loader', options: { name: 'assets/[hash].[ext]' } }
                ]
            }
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
        // drop other locales from moment for size
        new webpack.ContextReplacementPlugin(/moment\/locale$/, /en|es/)
    ],
    resolve: {
        extensions: [".js", ".json", ".scss"],
        alias: {
            // force a single react version (a hack for some dep.. I forget which)
            react: path.join(__dirname, 'node_modules/react')
        }
    },
    externals: nodeModules
};

if (NODE_ENV === 'production') {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        sourceMap: true
    }));
}

module.exports = config;
