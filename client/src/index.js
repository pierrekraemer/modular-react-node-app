import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import { HashRouter } from 'react-router-dom';

import App from 'components/app';

import reducer from 'reducers';

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
	<Provider store={ store }>
		<HashRouter>
			<App />
		</HashRouter>
	</Provider>,
	document.getElementById('root')
);
