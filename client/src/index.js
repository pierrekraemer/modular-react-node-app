import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import { HashRouter } from 'react-router-dom';

import App from './pc_app';

import weather from './weather/weather_reducer';
import todolist from './todolist/todolist_reducer';

const store = createStore(
	combineReducers({
		weather,
		todolist
	}),
	applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
	<Provider store={ store }>
		<HashRouter>
			<App />
		</HashRouter>
	</Provider>,
	document.getElementById('root')
);
