import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import { whoami } from '../user/user_actions';

import NavBar from './cc_navbar';

import WeatherApp from '../weather/cc_weatherapp';
import TodoListApp from '../todolist/cc_todolistapp';
import UserSignin from '../user/cc_usersignin';
import UserSignup from '../user/cc_usersignup';
import UserSignout from '../user/cc_usersignout';

const App = (props) => ({
	componentWillMount() {
		props.whoami();
	},

	render() {
		return (
			<div>
				<NavBar />
				<div className="container">
					<Route exact path="/" render={ () => (
						<div className="jumbotron">
							<h1> Welcome home ! </h1>
						</div>
					) } />
					<Route path="/weather" component={ WeatherApp } />
					<Route path="/todolist" component={ TodoListApp } />
					<Route exact path="/signin" component={ UserSignin } />
					<Route exact path="/signup" component={ UserSignup } />
					<Route exact path="/signout" component={ UserSignout } />
				</div>
			</div>
		);
	}
});

App.propTypes = {
	whoami: PropTypes.func.isRequired
}

export default withRouter(connect(
	null,
	(dispatch) => ({
		whoami: () => dispatch(whoami())
	})
)(App));
