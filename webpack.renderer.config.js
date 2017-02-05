/* globals __dirname, process, require, module */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.base.config.js');
const NODE_ENV = process.env.NODE_ENV || 'development';

// config for electron renderer
let rendererConfig = Object.assign({}, config, {
    entry: {
        renderer: './src/renderer'
    },
    target: 'electron-renderer',
    plugins: config.plugins.concat([
        new HtmlWebpackPlugin({
            chunks: ['renderer'],
            title: 'App',
            filename: 'index.html'
            //, template: 'src/client/index.html'
        })
    ])
});

module.exports = rendererConfig;
