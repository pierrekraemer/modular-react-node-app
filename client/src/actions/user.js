import 'whatwg-fetch';
import { checkStatus, authorization } from 'actions/utils/fetch_utils';

export const signin = (credentials) => (dispatch) => {
	return fetch('/api/user/signin', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(credentials)
	})
	.then(checkStatus)
	.then((res) => res.json())
	.then((data) => {
		window.localStorage.setItem('token', data.token);
		dispatch({
			type: 'USER::RESPONSE_SIGNIN',
			data: data.user
		});
	});
};

export const whoami = () => (dispatch) => {
	return fetch('/api/user/whoami', authorization())
	.then(checkStatus)
	.then((res) => res.json())
	.then((data) => dispatch({
		type: 'USER::RESPONSE_SIGNIN',
		data
	}))
	.catch((err) => {
		window.localStorage.removeItem('token');
		dispatch({
			type: 'USER::SIGNOUT'
		});
	});
};

export const signup = (credentials) => (dispatch) => {
	return fetch('/api/user/signup', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(credentials)
	})
	.then(checkStatus);
};

export const signout = () => (dispatch) => {
	window.localStorage.removeItem('token');
	dispatch({
		type: 'USER::SIGNOUT'
	});
};
