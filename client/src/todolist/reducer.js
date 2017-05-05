import { combineReducers } from 'redux';

const todoList = (
	state = [],
	action
) => {
	switch (action.type) {
		case 'TODOLIST::RESPONSE_FETCH_TODOS':
			return action.todos;
		case 'TODOLIST::RESPONSE_ADD_TODO':
			return [ action.todo, ...state ];
		case 'TODOLIST::RESPONSE_REMOVE_TODO':
			const idx = state.findIndex((t) => t.id === action.id);
			return [ ...state.slice(0, idx), ...state.slice(idx+1) ];
		case 'TODOLIST::RESPONSE_UPDATE_TODO':
			return state.map((t) => t.id === action.todo.id ? action.todo : t);
		case 'USER::SIGNOUT':
			return [];
		default:
			return state;
	}
};

const todoFilter = (
	state = 'All',
	action
) => {
	switch (action.type) {
		case 'TODOLIST::SET_TODO_FILTER':
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
		case 'TODOLIST::REQUEST_FETCH_TODOS':
		case 'TODOLIST::REQUEST_ADD_TODO':
		case 'TODOLIST::REQUEST_REMOVE_TODO':
		case 'TODOLIST::REQUEST_UPDATE_TODO':
			return true;
		case 'TODOLIST::RESPONSE_FETCH_TODOS':
		case 'TODOLIST::RESPONSE_ADD_TODO':
		case 'TODOLIST::RESPONSE_REMOVE_TODO':
		case 'TODOLIST::RESPONSE_UPDATE_TODO':
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
