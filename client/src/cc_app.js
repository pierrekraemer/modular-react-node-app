import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Link, Redirect, withRouter } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import { whoami } from './user/user_actions';

import WeatherApp from './weather/cc_weatherapp';
import TodoListApp from './todolist/cc_todolistapp';
import UserSignin from './user/cc_usersignin';
import UserSignout from './user/cc_usersignout';

const SigninNavItem = connect(
	(state) => ({ user: state.user })
)((props) => {
	if (props.user) {
		return (<NavItem> <NavLink tag={Link} to="/signout"> Signout ({ props.user.username }) </NavLink> </NavItem>);
	} else {
		return (<NavItem> <NavLink tag={Link} to="/signin"> Signin </NavLink> </NavItem>);
	}
});

const App = (props) => ({
	componentWillMount() {
		props.whoami();
	},

	render() {
		return (
			<div>
				<Navbar className="mb-4" color="inverse" inverse toggleable>
					<NavbarToggler right />
					<NavbarBrand tag={Link} to="/"> Home </NavbarBrand>
					<Collapse navbar>
						<Nav navbar>
							<NavItem> <NavLink tag={Link} to="/weather"> Weather </NavLink> </NavItem>
							<NavItem> <NavLink tag={Link} to="/todolist"> TodoList </NavLink> </NavItem>
						</Nav>
						<Nav className="ml-auto" navbar>
							<SigninNavItem />
						</Nav>
					</Collapse>
				</Navbar>
				<div className="container">
					<Route exact path="/" render={ () => (
						<div className="jumbotron">
							<h1> Welcome home ! </h1>
						</div>
					) } />
					<Route path="/weather" component={ WeatherApp } />
					<Route path="/todolist" component={ TodoListApp } />
					<Route exact path="/signin" component={ UserSignin } />
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
