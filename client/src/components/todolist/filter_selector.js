import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, ButtonGroup, Badge } from 'reactstrap';

import { todoFilters, setTodoFilter } from 'actions/todolist';

const FilterSelector = (props) => (
	<ButtonGroup className="mb-4">
		{ props.options.map((option, index) => {
			return (
				<Button
					key={ index }
					color="primary"
					active={ props.selected === option }
					onClick={ () => props.onChange(option) }
				>
					{ option }
					{ ' ' }
					<Badge pill> { props.nb_todos[index] } </Badge>
				</Button>
			);
		}) }
	</ButtonGroup>
);

FilterSelector.propTypes = {
	options: PropTypes.arrayOf(PropTypes.string).isRequired,
	selected: PropTypes.string.isRequired,
	nb_todos: PropTypes.arrayOf(PropTypes.number).isRequired,
	onChange: PropTypes.func.isRequired
};

const get_nb_todos = (todos) => {
	const result = [0, 0, 0]; // all, active, done
	todos.forEach((t) => {
		result[0]++;
		if (t.done) {
			result[2]++;
		} else {
			result[1]++;
		}
	});
	return result;
}

export default connect(
	(state) => ({
		options: [ 'All', 'Active', 'Done' ],
		selected: state.todolist.todoFilter,
		nb_todos: get_nb_todos(state.todolist.todoList)
	}),
	(dispatch) => ({
		onChange: (filter) => dispatch(setTodoFilter(filter))
	})
)(FilterSelector);
