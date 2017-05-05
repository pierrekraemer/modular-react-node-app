import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Col, Form, FormGroup, FormFeedback, InputGroup, InputGroupAddon, Input } from 'reactstrap';

import { signup } from './actions';

const UserSignup = (props) => {
	
	const comp = Object.create(React.Component.prototype);

	const handleChange = (event, elem) => {
		comp.setState({ [elem]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (comp.state.password !== comp.state.passwordConfirm) {
			comp.setState({
				message: 'Password confirmation is not equal to password'
			});
		} else {
			comp.props.onSubmit({
				username: comp.state.username,
				password: comp.state.password
			})
			.then(() => comp.props.history.push('/signin'))
			.catch((err) => {
				comp.setState({
					username: '',
					password: '',
					passwordConfirm: '',
					message: err.message
				});
			});
		}
	};
	
	return Object.assign(comp, {
		props,

		state: {
			username: '',
			password: '',
			passwordConfirm: '',
			message: ''
		},

		render() {
			let message = null;
			if (this.state.message !== '') {
				message = (
					<FormGroup color="danger">
						<FormFeedback> { this.state.message } </FormFeedback>
					</FormGroup>
				);
			}
			return (
				<Col sm="12" md={{ size: 6, offset: 3 }}>
					<Form onSubmit={ handleSubmit }>
						<FormGroup row>
							<InputGroup>
								<InputGroupAddon> <i className="fa fa-user"></i> </InputGroupAddon>
								<Input type="text" value={ this.state.username } onChange={ (e) => handleChange(e, 'username') } name="username" id="username" placeholder="Username" autoFocus />
							</InputGroup>
						</FormGroup>
						<FormGroup row>
							<InputGroup>
								<InputGroupAddon> <i className="fa fa-key"></i> </InputGroupAddon>
								<Input type="password" value={ this.state.password } onChange={ (e) => handleChange(e, 'password') } name="password" id="password" placeholder="Password" />
							</InputGroup>
						</FormGroup>
						<FormGroup row>
							<InputGroup>
								<InputGroupAddon> <i className="fa fa-key"></i> </InputGroupAddon>
								<Input type="password" value={ this.state.passwordConfirm } onChange={ (e) => handleChange(e, 'passwordConfirm') } name="passwordconfirm" id="passwordconfirm" placeholder="Password confirmation" />
							</InputGroup>
						</FormGroup>
						<FormGroup row>
							<Button color="primary">
								<i className="fa fa-sign-in"></i> Signup
							</Button>
						</FormGroup>
						{ message }
					</Form>
				</Col>
			)
		}
	});
}

UserSignup.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired
};

export default connect(
	null,
	(dispatch) => ({
		onSubmit: (credentials) => dispatch(signup(credentials))
	})
)(withRouter(UserSignup));
