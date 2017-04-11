import { combineReducers } from 'redux';

const todoList = (
	state = [],
	action
) => {
	switch (action.type) {
		case 'RESPONSE_FETCH_TODOS':
			return action.todos;
		case 'RESPONSE_ADD_TODO':
			return [ ...state, action.todo ];
		case 'RESPONSE_REMOVE_TODO':
			const idx = state.findIndex((t) => t.id === action.id);
			return [ ...state.slice(0, idx), ...state.slice(idx+1) ];
		case 'RESPONSE_UPDATE_TODO':
			return state.map((t) => t.id === action.todo.id ? action.todo : t);
		default:
			return state;
	}
};

const todoFilter = (
	state = 'All',
	action
) => {
	switch (action.type) {
		case 'SET_TODO_FILTER':
			return action.filter;
		default:
			return state;
	}
};

const isFetching = (
	state = false,
	action
) => {
	switch (action.type) {
		case 'REQUEST_FETCH_TODOS':
		case 'REQUEST_ADD_TODO':
		case 'REQUEST_REMOVE_TODO':
		case 'REQUEST_UPDATE_TODO':
			return true;
		case 'RESPONSE_FETCH_TODOS':
		case 'RESPONSE_ADD_TODO':
		case 'RESPONSE_REMOVE_TODO':
		case 'RESPONSE_UPDATE_TODO':
			return false;
		default:
			return state;
	}
}

export default combineReducers({
	todoList,
	todoFilter,
	isFetching
});
