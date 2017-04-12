import fetch from 'isomorphic-fetch';
import { checkStatus, authorization } from '../utils/fetch_utils';

export const fetchTodos = () => (dispatch) => {
	dispatch(reqFetchTodos());
	return fetch('/api/todo', authorization())
	.then(checkStatus)
	.then((res) => res.json())
	.then((todos) => dispatch(resFetchTodos(todos)));
};
const reqFetchTodos = () => ({
	type: 'TODOLIST::REQUEST_FETCH_TODOS'
});
const resFetchTodos = (todos) => ({
	type: 'TODOLIST::RESPONSE_FETCH_TODOS',
	todos
});

export const addTodo = (text) => (dispatch) => {
	dispatch(reqAddTodo());
	return fetch('/api/todo', authorization({
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ text })
	}))
	.then(checkStatus)
	.then((res) => res.json())
	.then((todo) => dispatch(resAddTodo(todo)));
};
export const reqAddTodo = () => ({
	type: 'TODOLIST::REQUEST_ADD_TODO'
});
export const resAddTodo = (todo) => ({
	type: 'TODOLIST::RESPONSE_ADD_TODO',
	todo
});

export const removeTodo = (id) => (dispatch) => {
	dispatch(reqRemoveTodo());
	return fetch('/api/todo/'+id, authorization({
		method: 'DELETE'
	}))
	.then(checkStatus)
	.then((res) => dispatch(resRemoveTodo(id)));
};
const reqRemoveTodo = () => ({
	type: 'TODOLIST::REQUEST_REMOVE_TODO'
});
const resRemoveTodo = (id) => ({
	type: 'TODOLIST::RESPONSE_REMOVE_TODO',
	id
});

export const updateTodo = (id, changes) => (dispatch) => {
	dispatch(reqUpdateTodo());
	return fetch('/api/todo/'+id, authorization({
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(changes)
	}))
	.then(checkStatus)
	.then((res) => res.json())
	.then((todo) => dispatch(resUpdateTodo(todo)));
};
const reqUpdateTodo = () => ({
	type: 'TODOLIST::REQUEST_UPDATE_TODO'
});
const resUpdateTodo = (todo) => ({
	type: 'TODOLIST::RESPONSE_UPDATE_TODO',
	todo
});

export const setTodoFilter = (filter) => ({
	type: 'TODOLIST::SET_TODO_FILTER',
	filter
});
