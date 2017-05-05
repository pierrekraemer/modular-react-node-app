import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form, InputGroup, InputGroupAddon, InputGroupButton, Input } from 'reactstrap';

import { addTodo } from './actions';

const AddTodo = (props) => {

	let textInput;

	const handleSubmit = (event) => {
		event.preventDefault();
		props.onSubmit(textInput.value)
		.then(() => textInput.value = '');
	};
	
	return (
		<Form className="mb-4" onSubmit={ handleSubmit }>
			<InputGroup>
				<InputGroupAddon> <i className="fa fa-pencil"></i> </InputGroupAddon>
				<Input type="text" getRef={ (el) => textInput = el } name="todotext" id="todotext" placeholder="Todo text" autoFocus />
				<InputGroupButton color="primary"> Add </InputGroupButton>
			</InputGroup>
		</Form>
	);
};

AddTodo.propTypes = {
	onSubmit: PropTypes.func.isRequired
};

export default connect(
	null,
	(dispatch) => ({
		onSubmit: (text) => dispatch(addTodo(text))
	})
)(AddTodo);
