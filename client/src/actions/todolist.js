import 'whatwg-fetch';
import { checkStatus, authorization } from 'actions/utils/fetch_utils';

export const fetchTodos = () => (dispatch) => {
	dispatch({
		type: 'TODOLIST::REQUEST_FETCH_TODOS'
	});
	return fetch('/api/todo', authorization())
	.then(checkStatus)
	.then((res) => res.json())
	.then((data) => dispatch({
		type: 'TODOLIST::RESPONSE_FETCH_TODOS',
		data
	}));
};

export const addTodo = (text) => (dispatch) => {
	dispatch({
		type: 'TODOLIST::REQUEST_ADD_TODO'
	});
	return fetch('/api/todo', authorization({
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ text })
	}))
	.then(checkStatus)
	.then((res) => res.json())
	.then((data) => dispatch({
		type: 'TODOLIST::RESPONSE_ADD_TODO',
		data
	}));
};

export const removeTodo = (id) => (dispatch) => {
	dispatch({
		type: 'TODOLIST::REQUEST_REMOVE_TODO'
	});
	return fetch('/api/todo/'+id, authorization({
		method: 'DELETE'
	}))
	.then(checkStatus)
	.then((res) => dispatch({
		type: 'TODOLIST::RESPONSE_REMOVE_TODO',
		data: id
	}));
};

export const updateTodo = (id, changes) => (dispatch) => {
	dispatch({
		type: 'TODOLIST::REQUEST_UPDATE_TODO'
	});
	return fetch('/api/todo/'+id, authorization({
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(changes)
	}))
	.then(checkStatus)
	.then((res) => res.json())
	.then((data) => dispatch({
		type: 'TODOLIST::RESPONSE_UPDATE_TODO',
		data
	}));
};

export const setTodoFilter = (filter) => ({
	type: 'TODOLIST::SET_TODO_FILTER',
	data: filter
});
