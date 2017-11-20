import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Col, Form, FormGroup, FormFeedback, InputGroup, InputGroupAddon, Input } from 'reactstrap';

import { signup } from './actions';

class UserSignup extends React.Component {
	state = {
		username: '',
		password: '',
		passwordConfirm: '',
		message: ''
	};

	handleChange = (event, elem) => {
		this.setState({ [elem]: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		if (this.state.password !== this.state.passwordConfirm) {
			this.setState({
				message: 'Password confirmation is not equal to password'
			});
		} else {
			this.props.onSubmit({
				username: this.state.username,
				password: this.state.password
			})
			.then(() => this.props.history.push('/signin'))
			.catch((err) => {
				this.setState({
					username: '',
					password: '',
					passwordConfirm: '',
					message: err.message
				});
			});
		}
	};
	
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
				<Form onSubmit={ this.handleSubmit }>
					<FormGroup row>
						<InputGroup>
							<InputGroupAddon> <i className="fa fa-user"></i> </InputGroupAddon>
							<Input type="text" value={ this.state.username } onChange={ (e) => this.handleChange(e, 'username') } name="username" id="username" placeholder="Username" autoFocus />
						</InputGroup>
					</FormGroup>
					<FormGroup row>
						<InputGroup>
							<InputGroupAddon> <i className="fa fa-key"></i> </InputGroupAddon>
							<Input type="password" value={ this.state.password } onChange={ (e) => this.handleChange(e, 'password') } name="password" id="password" placeholder="Password" />
						</InputGroup>
					</FormGroup>
					<FormGroup row>
						<InputGroup>
							<InputGroupAddon> <i className="fa fa-key"></i> </InputGroupAddon>
							<Input type="password" value={ this.state.passwordConfirm } onChange={ (e) => this.handleChange(e, 'passwordConfirm') } name="passwordconfirm" id="passwordconfirm" placeholder="Password confirmation" />
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
