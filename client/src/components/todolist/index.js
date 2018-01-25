import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';

import FilterSelector from 'components/todolist/filter_selector';
import TodoList from 'components/todolist/todo_list';
import AddTodo from 'components/todolist/add_todo';

import { fetchTodos } from 'actions/todolist';

class TodoApp extends React.Component {

	componentDidMount() {
		this.props.fetchTodos();
	}

	render() {
		return (
			<Col sm={12} md={{ size: 8, offset: 2 }}>
				<AddTodo />
				<FilterSelector />
				<TodoList />
			</Col>
		);
	}
};

TodoApp.propTypes = {
	fetchTodos: PropTypes.func.isRequired
};

export default connect(
	null,
	(dispatch) => ({
		fetchTodos: () => dispatch(fetchTodos())
	})
)(TodoApp);
