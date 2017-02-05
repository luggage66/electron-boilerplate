/* globals require, module */
const webpack = require('webpack');
const baseConfig = require('./webpack.base.config.js');

// config for electron main
let mainConfig = Object.assign({}, baseConfig, {
    entry: {
        main: './src/main/index'
    },
    target: 'electron'
});

module.exports = mainConfig;
