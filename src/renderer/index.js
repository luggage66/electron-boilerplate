/* globals document */
import React from 'react';
import ReactDom from 'react-dom';
import AppView from './appView';
import ApplicationState from './applicationState';

// make a root element to mount the app into
let reactContainer = document.createElement('div');
reactContainer.id = 'app-react-container';
document.body.appendChild(reactContainer);

// for debugging in the console.
let appState = global.app = new ApplicationState();

//mounty mounty
ReactDom.render(<AppView appState={appState} />, reactContainer);
