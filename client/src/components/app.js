import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import { whoami } from 'actions/user';

import NavBar from 'components/nav/navbar';

import Weather from 'components/weather';
import TodoList from 'components/todolist';

import UserSignin from 'components/user/signin';
import UserSignup from 'components/user/signup';
import UserSignout from 'components/user/signout';

class App extends React.Component {

	componentDidMount() {
		this.props.whoami();
	}

	render() {
		return (
			<div>
				<NavBar />
				<div className="container" style={{ marginTop: '5rem' }}>
					<Route exact path="/" render={ () => (
						<div className="jumbotron">
							<h1> Welcome home ! </h1>
						</div>
					) } />
					<Route path="/weather" component={ Weather } />
					<Route path="/todolist" component={ TodoList } />
					<Route exact path="/signin" component={ UserSignin } />
					<Route exact path="/signup" component={ UserSignup } />
					<Route exact path="/signout" component={ UserSignout } />
				</div>
			</div>
		);
	}
};

App.propTypes = {
	whoami: PropTypes.func.isRequired
};

export default withRouter(connect(
	null,
	(dispatch) => ({
		whoami: () => dispatch(whoami())
	})
)(App));
