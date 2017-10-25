import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import { whoami } from './user/actions';

import NavBar from './nav/navbar';

import WeatherApp from './weather/app';
import TodoListApp from './todolist/app';
import UserSignin from './user/signin';
import UserSignup from './user/signup';
import UserSignout from './user/signout';

const App = (props) => ({
	props,

	componentWillMount() {
		this.props.whoami();
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
