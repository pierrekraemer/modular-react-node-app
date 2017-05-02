import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, InputGroup, InputGroupAddon, InputGroupButton, Input } from 'reactstrap';

import { fetchCity } from './weather_actions';

const AddCity = (props) => {

	let textInput;

	const handleSubmit = (event) => {
		e.preventDefault();
		props.onSubmit(textInput.value);
		textInput.value = '';
	}
	
	return (
		<Form onSubmit={ handleSubmit }>
			<InputGroup>
				<InputGroupAddon> <i className="fa fa-globe"></i> </InputGroupAddon>
				<Input type="text" getRef={ (el) => textInput = el } name="cityname" id="cityname" placeholder="City name" autoFocus />
				{ !props.isFetching &&
					<InputGroupButton color="primary"> Add </InputGroupButton>
				}
				{ props.isFetching &&
					<InputGroupAddon> <i className="fa fa-spinner fa-spin"></i> </InputGroupAddon>
				}
			</InputGroup>
		</Form>
	);
};

AddCity.propTypes = {
	isFetching: PropTypes.bool.isRequired,
	onSubmit: PropTypes.func.isRequired
};

export default connect(
	(state) => ({
		isFetching: state.weather.isFetching
	}),
	(dispatch) => ({
		onSubmit: (text) => dispatch(fetchCity(text))
	})
)(AddCity);
