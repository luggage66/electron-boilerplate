/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _electron = __webpack_require__(1);

	var _path = __webpack_require__(2);

	var _path2 = _interopRequireDefault(_path);

	var _url = __webpack_require__(3);

	var _url2 = _interopRequireDefault(_url);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Keep a global reference of the window object, if you don't, the window will
	// be closed automatically when the JavaScript object is garbage collected.
	let win;

	function createWindow() {
	    // Create the browser window.
	    win = new _electron.BrowserWindow({ width: 800, height: 600 });

	    // and load the index.html of the app.
	    win.loadURL(_url2.default.format({
	        pathname: _path2.default.join(__dirname, '../index.html'),
	        protocol: 'file:',
	        slashes: true
	    }));

	    // Open the DevTools.
	    win.webContents.openDevTools();

	    // Emitted when the window is closed.
	    win.on('closed', () => {
	        // Dereference the window object, usually you would store windows
	        // in an array if your app supports multi windows, this is the time
	        // when you should delete the corresponding element.
	        win = null;
	    });
	}

	// This method will be called when Electron has finished
	// initialization and is ready to create browser windows.
	// Some APIs can only be used after this event occurs.
	_electron.app.on('ready', createWindow);

	// Quit when all windows are closed.
	_electron.app.on('window-all-closed', () => {
	    // On macOS it is common for applications and their menu bar
	    // to stay active until the user quits explicitly with Cmd + Q
	    if (process.platform !== 'darwin') {
	        _electron.app.quit();
	    }
	});

	_electron.app.on('activate', () => {
	    // On macOS it's common to re-create a window in the app when the
	    // dock icon is clicked and there are no other windows open.
	    if (win === null) {
	        createWindow();
	    }
	});

	// In this file you can include the rest of your app's specific main process
	// code. You can also put them in separate files and require them here.

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("electron");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("url");

/***/ }
/******/ ]);