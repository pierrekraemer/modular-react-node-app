
export function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	} else {
		var error = new Error(response.statusText);
		error.response = response;
		throw error;
	}
}

export function authorization(options = {}) {
	const token = window.localStorage.getItem('token');
	if (token) {
		const auth = { 'Authorization': 'Bearer ' + token };
		if (options.headers) {
			Object.assign(options.headers, auth);
		} else {
			options.headers = auth;
		}
	}
	return options;
}
