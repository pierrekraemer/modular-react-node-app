import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form, InputGroup, InputGroupAddon, InputGroupButton, Input } from 'reactstrap';

import { fetchCity } from './actions';

const AddCity = (props) => {

	let textInput;

	const handleSubmit = (event) => {
		event.preventDefault();
		props.onSubmit(textInput.value)
		.then((res) => {
			textInput.value = '';
			props.history.push('/weather/' + res.cityWeather.id);
		});
	};
	
	return (
		<Form onSubmit={ handleSubmit }>
			<InputGroup>
				<InputGroupAddon> <i className="fa fa-globe"></i> </InputGroupAddon>
				<Input type="text" innerRef={ (el) => textInput = el } name="cityname" id="cityname" placeholder="City name" autoFocus />
				<InputGroupButton color="primary"> Add </InputGroupButton>
			</InputGroup>
		</Form>
	);
};

AddCity.propTypes = {
	onSubmit: PropTypes.func.isRequired
};

export default connect(
	null,
	(dispatch) => ({
		onSubmit: (text) => dispatch(fetchCity(text))
	})
)(withRouter(AddCity));
