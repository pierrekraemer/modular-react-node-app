import fetch from 'isomorphic-fetch';

export const fetchCity = (cityName) => {
	return (dispatch) => {
		dispatch(requestCityWeather(cityName));
		return fetch('http://api.openweathermap.org/data/2.5/weather?appid=8655dbf242aa1f005f358c18e785d948&mode=json&units=metric&q=' + cityName)
			.then((res) => res.json())
			.then((cityWeather) => dispatch(receiveCityWeather(cityWeather)));
	}
};

export const fetchAll = () => {
	return (dispatch, getState) => {
		getState().weather.cities.forEach((c) => dispatch(fetchCity(c.name)));
	}
}

const requestCityWeather = (cityName) => ({
	type: 'REQUEST_CITY_WEATHER',
	cityName
});

const receiveCityWeather = (cityWeather) => ({
	type: 'RECEIVE_CITY_WEATHER',
	cityWeather
});

export const removeCity = (id) => ({
	type: 'REMOVE_CITY',
	id
});
