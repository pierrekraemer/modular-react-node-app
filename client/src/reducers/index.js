import { combineReducers } from 'redux';

import user from 'reducers/user';
import todolist from 'reducers/todolist';
import weather from 'reducers/weather';

const reducer = combineReducers({
	user,
	todolist,
	weather
});

export default reducer;
