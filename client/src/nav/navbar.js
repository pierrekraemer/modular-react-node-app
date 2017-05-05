import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import SigninNav from './signin';
import ConditionalNavItem from './conditional_navitem';

const NavBar = (props) => (
	<Navbar className="mb-4" color="inverse" inverse toggleable>
		<NavbarToggler right />
		<NavbarBrand tag={ Link } to="/"> Home </NavbarBrand>
		<Collapse navbar>
			<Nav navbar>
				<NavItem>
					<NavLink tag={ Link } to="/weather"> Weather </NavLink>
				</NavItem>
				<ConditionalNavItem condition={ () => props.user && props.user.hasRole(['user']) }>
					<NavLink tag={ Link } to="/todolist"> TodoList </NavLink>
				</ConditionalNavItem>
			</Nav>
			<SigninNav user={ props.user } />
		</Collapse>
	</Navbar>
);

NavBar.propTypes = {
	user: PropTypes.object
};

export default connect(
	(state) => ({
		user: state.user
	})
)(NavBar);
