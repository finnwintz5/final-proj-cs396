import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/login.css';
import './css/style.css';
// import './index.css';
import {hasCsrfToken, setAccessTokenCookie, getAccessTokenCookie} from './utils';

function renderApp() {
    let logged_in = FALSE;
    if (getAccessTokenCookie()) {
        logged_in = TRUE;
    }
    ReactDOM.render(
        <App logged_in={logged_in}/>,
        document.querySelector('div')
    );
}

/**************************************************************
 * Authentication
 **************************************************************
 * There are two authentication pathways handled here:
 * 1. The hasCsrfToken() pathway is used if React is being
 *    served on the same server as the REST API (and uses the
 *    Flask server-side login form). For production deployment
 *    only.
 * 
 * 2. The setAccessTokenCookie() pathway is used if you have
 *    created a stand-alone react app that is interacting with
 *    the REST API on another server. This one is the one used
 *    for testing (when using npm start).
 **************************************************************
 */

// this initializes the app after the access token is set.
if (hasCsrfToken() && window.location.port !== '3000') {
    // this executes if the app is run within flask:
    console.log('Authentication handled via CSRF + Http-only cookie.')
    renderApp();
} else {
    console.log(window.location.port === '3000')
    // this executes if the app is run via npm start
    console.log('Authentication handled via REST API Token.')
    renderApp();
}