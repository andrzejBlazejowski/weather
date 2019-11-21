import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import WebFont from 'webfontloader';
import {Provider} from 'react-redux';
import store from './store/store';

WebFont.load({
  google: {
    families: ['Open Sans:300,400,600,700&display=swap']
  }
});
//https://fonts.googleapis.com/css?family=Open+Sans+Web:300,400,600,700%7Csans-serif
//https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&display=swap
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
