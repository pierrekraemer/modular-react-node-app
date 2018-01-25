import { combineReducers } from 'redux';

const cities = (
	state = [],
	action
) => {
	switch (action.type) {
		case 'WEATHER::RESPONSE_CITY_WEATHER': {
			const idx = state.findIndex((c) => c.id === action.data.id);
			if (idx === -1) {
				return [ ...state, action.data ];
			} else {
				return state.map((c) => c.id === action.data.id ? action.data : c);
			}
		}
		case 'WEATHER::REMOVE_CITY': {
			return state.filter((c) => c.id !== action.data);
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
		case 'WEATHER::REQUEST_CITY_WEATHER':
			return true;
		case 'WEATHER::RESPONSE_CITY_WEATHER':
		case 'WEATHER::ERROR_RESPONSE_CITY_WEATHER':
			return false;
		default:
			return state;
	}
}

export default combineReducers({
	isFetching,
	cities
});
