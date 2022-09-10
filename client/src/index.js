import React from 'react';
import ReactDOM from 'react-dom';
// provider keeps track of 'store', a global state, and this allow us to access it anywhere
//  in the app
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

import App from './App';
import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store ={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);