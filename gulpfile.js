/* globals process, require */
"use strict";
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const spawn = require('child_process').spawn;
const changed = require('gulp-changed');
const del = require('del');
const webpack = require('webpack');
const gulpWebpack = require('gulp-webpack');
const runSequence = require('run-sequence');
// const gzip = require('gulp-gzip');

const paths = {
    dest: 'dist'
};

gulp.task('clean', () => {
    return del(paths.dest);
});

gulp.task('clean-build', (cb) => {
    runSequence('clean', 'build', cb);
});

gulp.task('build', ['build-renderer', 'build-main']);

gulp.task('build-renderer', () => {
    return gulpWebpack(require('./webpack.renderer.config.js'), webpack)
        .pipe(gulp.dest(paths.dest));
});

gulp.task('build-main', () => {
    return gulpWebpack(require('./webpack.main.config.js'), webpack)
        .pipe(gulp.dest(paths.dest));
});

// Development mode. rebuild and restart server on file changed.
gulp.task('dev-server', [ 'server'], () => {
    return gulp.watch(paths.src, [ 'server']);
});

// Start Express server
let node;
gulp.task('server', ['build-server'], () => {
    if (node) {
        node.kill();
        node = null;
    }

    node = spawn('node', [ 'lib/server/server.js' ], { stdio: 'inherit' });

    node.on('close', (code) => {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
});

// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill();
});
