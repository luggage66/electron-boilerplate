/* globals __dirname, process, require, module */
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.base.config.js');

const NODE_ENV = process.env.NODE_ENV || 'development';

// config for electron main
let mainConfig = Object.assign({}, config, {
    entry: {
        main: './src/main/index'
    },
    target: 'electron'
});

module.exports = mainConfig;
