import 'whatwg-fetch';
import { checkStatus } from 'actions/utils/fetch_utils';

export const fetchCity = (cityName) => (dispatch) => {
	dispatch({
		type: 'WEATHER::REQUEST_CITY_WEATHER'
	});
	return fetch('http://api.openweathermap.org/data/2.5/weather?appid=8655dbf242aa1f005f358c18e785d948&mode=json&units=metric&q=' + cityName)
	.then(checkStatus)
	.then((res) => res.json())
	.then((data) => dispatch({
		type: 'WEATHER::RESPONSE_CITY_WEATHER',
		data
	}))
	.catch(() => dispatch({
		type: 'WEATHER::ERROR_RESPONSE_CITY_WEATHER'
	}));
};

export const fetchAll = () => (dispatch, getState) => {
	getState().weather.cities.forEach((c) => dispatch(fetchCity(c.name)));
};

export const removeCity = (id) => ({
	type: 'WEATHER::REMOVE_CITY',
	data: id
});
