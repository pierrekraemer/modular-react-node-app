import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Col, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';

import { signin } from './user_actions';

const UserSignin = (props) => {

	let usernameInput, passwordInput;

	let handleSubmit = (event) => {
		event.preventDefault();
		props.onSubmit({
			username: usernameInput.value,
			password: passwordInput.value
		})
		.then(() => {
			props.history.push('/');
		})
		.catch((err) => {
			passwordInput.value = '';
		});
	};
	
	return (
		<Col sm="12" md={{ size: 6, offset: 3 }}>
			<Form onSubmit={ handleSubmit }>
				<FormGroup row>
					<InputGroup>
						<InputGroupAddon> <i className="fa fa-user"></i> </InputGroupAddon>
						<Input type="text" getRef={ (el) => usernameInput = el } name="username" id="username" placeholder="Username" />
					</InputGroup>
				</FormGroup>
				<FormGroup row>
					<InputGroup>
						<InputGroupAddon> <i className="fa fa-key"></i> </InputGroupAddon>
						<Input type="password" getRef={ (el) => passwordInput = el } name="password" id="password" placeholder="Password" />
					</InputGroup>
				</FormGroup>
				<FormGroup row>
					<Button color="primary">
						<i className="fa fa-sign-in"></i> Signin
					</Button>
				</FormGroup>
			</Form>
		</Col>
	);
};

UserSignin.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired
};

export default connect(
	null,
	(dispatch) => ({
		onSubmit: (credentials) => dispatch(signin(credentials))
	})
)(withRouter(UserSignin));
