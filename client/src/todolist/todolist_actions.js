import fetch from 'isomorphic-fetch';
import { checkStatus } from '../utils/fetch_utils';

export const fetchTodos = () => {
	return (dispatch) => {
		dispatch(reqFetchTodos());
		return fetch('/api/todo')
		.then(checkStatus)
		.then((res) => res.json())
		.then((todos) => dispatch(resFetchTodos(todos)));
	}
}
const reqFetchTodos = () => ({
	type: 'REQUEST_FETCH_TODOS'
});
const resFetchTodos = (todos) => ({
	type: 'RESPONSE_FETCH_TODOS',
	todos
});

export const addTodo = (text) => {
	return (dispatch) => {
		dispatch(reqAddTodo());
		return fetch('/api/todo', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ text })
		})
		.then(checkStatus)
		.then((res) => res.json())
		.then((todo) => dispatch(resAddTodo(todo)));
	}
};
export const reqAddTodo = () => ({
	type: 'REQUEST_ADD_TODO'
});
export const resAddTodo = (todo) => ({
	type: 'RESPONSE_ADD_TODO',
	todo
});

export const removeTodo = (id) => {
	return (dispatch) => {
		dispatch(reqRemoveTodo());
		return fetch('/api/todo/'+id, {
			method: 'DELETE'
		})
		.then(checkStatus)
		.then((res) => dispatch(resRemoveTodo(id)));
	}
};
const reqRemoveTodo = () => ({
	type: 'REQUEST_REMOVE_TODO'
});
const resRemoveTodo = (id) => ({
	type: 'RESPONSE_REMOVE_TODO',
	id
});

export const updateTodo = (id, changes) => {
	return (dispatch) => {
		dispatch(reqUpdateTodo());
		return fetch('/api/todo/'+id, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(changes)
		})
		.then(checkStatus)
		.then((res) => res.json())
		.then((todo) => dispatch(resUpdateTodo(todo)));
	}
};
const reqUpdateTodo = () => ({
	type: 'REQUEST_UPDATE_TODO'
});
const resUpdateTodo = (todo) => ({
	type: 'RESPONSE_UPDATE_TODO',
	todo
});

export const setTodoFilter = (filter) => ({
	type: 'SET_TODO_FILTER',
	filter
});
