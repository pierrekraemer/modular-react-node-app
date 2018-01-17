import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';

import FilterSelector from './filter_selector';
import TodoList from './todo_list';
import AddTodo from './add_todo';

import { fetchTodos } from './actions';

const TodoApp = (props) => ({
	componentDidMount() {
		props.fetchTodos();
	},

	render() {
		return (
			<Col sm={12} md={{ size: 8, offset: 2 }}>
				<AddTodo />
				<FilterSelector />
				<TodoList />
			</Col>
		);
	}
});

TodoApp.propTypes = {
	fetchTodos: PropTypes.func.isRequired
};

export default connect(
	null,
	(dispatch) => ({
		fetchTodos: () => dispatch(fetchTodos())
	})
)(TodoApp);
