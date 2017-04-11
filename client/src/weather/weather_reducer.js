import { combineReducers } from 'redux';

const cities = (
	state = [],
	action
) => {
	switch (action.type) {
		case 'RECEIVE_CITY_WEATHER': {
			const idx = state.findIndex((c) => c.id === action.cityWeather.id);
			if (idx === -1) {
				return [ ...state, action.cityWeather ];
			} else {
				return state.map((c) => {
					if (c.id !== action.cityWeather.id) { return c; }
					return action.cityWeather;
				});
			}
		}
		case 'REMOVE_CITY': {
			const idx = state.findIndex((c) => c.id === action.id);
			if (idx === -1) {
				return state;
			} else {
				return [ ...state.slice(0, idx), ...state.slice(idx+1) ];
			}
		}
		default:
			return state;
	}
};

const isFetching = (
	state = false,
	action
) => {
	switch (action.type) {
		case 'REQUEST_CITY_WEATHER':
			return true;
		case 'RECEIVE_CITY_WEATHER':
			return false;
		default:
			return state;
	}
}

export default combineReducers({
	isFetching,
	cities
});
