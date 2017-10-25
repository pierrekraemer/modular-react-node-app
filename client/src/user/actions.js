import 'whatwg-fetch';
import { checkStatus, authorization } from '../utils/fetch_utils';

export const signin = (credentials) => (dispatch) => {
	// dispatch(reqSignin());
	return fetch('/api/user/signin', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(credentials)
	})
	.then(checkStatus)
	.then((res) => res.json())
	.then((data) => {
		window.localStorage.setItem('token', data.token);
		dispatch(resSignin(data.user));
	});
};
export const whoami = () => (dispatch) => {
	// dispatch(reqSignin());
	return fetch('/api/user/whoami', authorization())
	.then(checkStatus)
	.then((res) => res.json())
	.then((user) => dispatch(resSignin(user)))
	.catch((err) => dispatch(signout()));
};
// const reqSignin = () => ({
// 	type: 'USER::REQUEST_SIGNIN'
// });
const resSignin = (user) => ({
	type: 'USER::RESPONSE_SIGNIN',
	user
});

export const signup = (credentials) => (dispatch) => {
	return fetch('/api/user/signup', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(credentials)
	})
	.then(checkStatus);
};

export const signout = () => {
	window.localStorage.removeItem('token');
	return {
		type: 'USER::SIGNOUT'
	};
};
