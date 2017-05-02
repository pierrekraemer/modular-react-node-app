import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Col, Form, FormGroup, FormFeedback, InputGroup, InputGroupAddon, Input } from 'reactstrap';

import { signin } from './user_actions';

const UserSignin = (props) => {
	
	const comp = Object.create(React.Component.prototype);

	const handleChange = (event, elem) => {
		comp.setState({ [elem]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		comp.props.onSubmit({
			username: comp.state.username,
			password: comp.state.password
		})
		.then(() => comp.props.history.push('/'))
		.catch((err) => {
			comp.setState({
				password: '',
				message: err.message
			});
		});
	};
	
	return Object.assign(comp, {
		props,

		state: {
			username: '',
			password: '',
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
							<Button color="primary">
								<i className="fa fa-sign-in"></i> Signin
							</Button>
						</FormGroup>
						{ message }
					</Form>
				</Col>
			);
		}
	});
}

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
