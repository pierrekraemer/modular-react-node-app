import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Col, Form, FormGroup, FormFeedback, InputGroup, InputGroupAddon, Input } from 'reactstrap';

import { signin } from './actions';

class UserSignin extends React.Component {
	state = {
		username: '',
		password: '',
		message: ''
	};

	handleChange = (event, elem) => {
		this.setState({ [elem]: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.onSubmit({
			username: this.state.username,
			password: this.state.password
		})
		.then(() => this.props.history.push('/'))
		.catch((err) => {
			comp.setState({
				password: '',
				message: err.message
			});
		});
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
						<Button color="primary">
							<i className="fa fa-sign-in"></i> Signin
						</Button>
					</FormGroup>
					{ message }
				</Form>
			</Col>
		);
	}
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
