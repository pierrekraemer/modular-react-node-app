import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form, InputGroup, InputGroupAddon, InputGroupButton, Input } from 'reactstrap';

import { fetchCity } from './weather_actions';

const AddCity = (props) => {

	let textInput;
	
	return (
		<Form onSubmit={ (e) => {
			e.preventDefault();
			props.onSubmit(textInput.value);
			textInput.value = '';
		} }>
			<InputGroup>
				<InputGroupAddon> <i className="fa fa-globe"></i> </InputGroupAddon>
				<Input type="text" getRef={ (el) => textInput = el } name="cityname" id="cityname" placeholder="City name" />
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
