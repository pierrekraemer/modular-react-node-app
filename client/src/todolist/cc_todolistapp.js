import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';

import FilterSelector from './cc_filter_selector';
import TodoList from './cc_todolist';
import AddTodo from './cc_addtodo';

import { fetchTodos } from './todolist_actions';

const TodoApp = (props) => ({
	componentWillMount() {
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
