import fetch from 'isomorphic-fetch';
import { checkStatus } from '../utils/fetch_utils';

export const fetchCity = (cityName) => (dispatch) => {
	dispatch(reqFetchCity());
	return fetch('http://api.openweathermap.org/data/2.5/weather?appid=8655dbf242aa1f005f358c18e785d948&mode=json&units=metric&q=' + cityName)
	.then(checkStatus)
	.then((res) => res.json())
	.then((cityWeather) => dispatch(resFetchCity(cityWeather)));
};
const reqFetchCity = () => ({
	type: 'WEATHER::REQUEST_CITY_WEATHER'
});
const resFetchCity = (cityWeather) => ({
	type: 'WEATHER::RESPONSE_CITY_WEATHER',
	cityWeather
});

export const fetchAll = () => (dispatch, getState) => {
	getState().weather.cities.forEach((c) => dispatch(fetchCity(c.name)));
};

export const removeCity = (id) => ({
	type: 'WEATHER::REMOVE_CITY',
	id
});
