import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListGroup } from 'reactstrap';

import TodoListItem from './todo_list_item';

import { removeTodo, updateTodo } from './actions';

const TodoList = (props) => (
	<ListGroup>
		{ props.todos.map((todo) => (
			<TodoListItem
				key={ todo.id }
				{ ...todo }
				onUpdate={ (changes) => props.onUpdateTodo(todo.id, changes) }
				onRemove={ () => props.onRemoveTodo(todo.id) }
			/>
		)) }
	</ListGroup>
);

TodoList.propTypes = {
	todos: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			text: PropTypes.string.isRequired,
			done: PropTypes.bool.isRequired
		}).isRequired
	).isRequired,
	onRemoveTodo: PropTypes.func.isRequired,
	onUpdateTodo: PropTypes.func.isRequired
};

const getFilteredTodos = (todos, filter) => {
	switch (filter) {
		case 'All':
			return todos;
		case 'Active':
			return todos.filter((t) => !t.done);
		case 'Done':
			return todos.filter((t) => t.done);
	}
}

export default connect(
	(state) => ({
		todos: getFilteredTodos(state.todolist.todoList, state.todolist.todoFilter)
	}),
	(dispatch) => ({
		onRemoveTodo: (id) => dispatch(removeTodo(id)),
		onUpdateTodo: (id, changes) => dispatch(updateTodo(id, changes))
	})
)(TodoList);
