/* globals __dirname, process, require, module */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base.config.js');

// config for electron renderer
let rendererConfig = Object.assign({}, baseConfig, {
    entry: {
        renderer: './src/renderer'
    },
    target: 'electron-renderer',
    plugins: baseConfig.plugins.concat([
        new HtmlWebpackPlugin({
            chunks: ['renderer'],
            title: 'App',
            filename: 'index.html'
            //, template: 'src/client/index.html'
        })
    ])
});

module.exports = rendererConfig;
